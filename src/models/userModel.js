import bcrypt from "bcryptjs";
import { postgresClient } from "../config/db.js";

export const ensureUsersTable = async () => {
  await postgresClient.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      referral_id VARCHAR(100),
      role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `);
};

export const createUser = async ({
  name,
  email,
  password,
  referral_id,
  role = "user",
}) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const { rows } = await postgresClient.query(
      "INSERT INTO users (name, email, password_hash, referral_id, role) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, referral_id, role, created_at",
      [name, email, hashedPassword, referral_id, role],
    );
    return rows[0];
  } catch (err) {
    if (err.code === "23505") {
      throw new Error("Email already registered");
    }
    throw err;
  }
};

export const findUserByEmail = async (email) => {
  const { rows } = await postgresClient.query(
    "SELECT * FROM users WHERE email = $1 LIMIT 1",
    [email],
  );
  return rows[0] || null;
};

export const findUserById = async (id) => {
  const { rows } = await postgresClient.query(
    "SELECT id, name, email, referral_id, role, created_at FROM users WHERE id = $1",
    [id],
  );
  return rows[0] || null;
};

export const comparePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};
