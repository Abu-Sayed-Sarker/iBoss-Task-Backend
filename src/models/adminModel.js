import bcrypt from "bcryptjs";
import { postgresClient } from "../config/db.js";

export const ensureAdminTable = async () => {
  await postgresClient.query(`
    CREATE TABLE IF NOT EXISTS admins (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      role VARCHAR(50) DEFAULT 'admin',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `);
};

export const createAdmin = async ({ email, password }) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const { rows } = await postgresClient.query(
      "INSERT INTO admins (email, password_hash, role) VALUES ($1, $2, $3) RETURNING id, email, role, created_at",
      [email, hashedPassword, "admin"]
    );
    return rows[0];
  } catch (err) {
    if (err.code === "23505") {
      throw new Error("Email already registered");
    }
    throw err;
  }
};

export const findAdminByEmail = async (email) => {
  const { rows } = await postgresClient.query(
    "SELECT * FROM admins WHERE email = $1 LIMIT 1",
    [email]
  );
  return rows[0] || null;
};

export const findAdminById = async (id) => {
  const { rows } = await postgresClient.query(
    "SELECT id, email, role, created_at FROM admins WHERE id = $1",
    [id]
  );
  return rows[0] || null;
};

export const comparePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

export const getAllAdmins = async () => {
  const { rows } = await postgresClient.query(
    "SELECT id, email, role, created_at FROM admins ORDER BY created_at DESC"
  );
  return rows;
};

export const deleteAdmin = async (id) => {
  const { rows } = await postgresClient.query(
    "DELETE FROM admins WHERE id = $1 RETURNING id, email",
    [id]
  );
  return rows[0] || null;
};
