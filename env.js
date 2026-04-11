import { config } from "dotenv";

config();

const getEnv = (key, fallback = "") => {
  const value = process.env[key];
  if (value === undefined || value === null || value === "") {
    return fallback;
  }
  return value;
};

const toInt = (value, fallback) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const env = {
  NODE_ENV: getEnv("NODE_ENV", "development"),
  PORT: toInt(getEnv("PORT", "5001"), 5001),
  API_BASE_URL: getEnv("API_BASE_URL", ""),

  DB_HOST: getEnv("DB_HOST", "localhost"),
  DB_PORT: toInt(getEnv("DB_PORT", "5432"), 5432),
  DB_USER: getEnv("DB_USER", "postgres"),
  DB_PASS: getEnv("DB_PASS", "1234"),
  DB_NAME: getEnv("DB_NAME", "iboss_task"),
  ACCESS_TOKEN_SECRET:
    getEnv("ACCESS_TOKEN_SECRET") || getEnv("JWT_SECRET", "access-secret-key"),
  REFRESH_TOKEN_SECRET: getEnv("REFRESH_TOKEN_SECRET", "refresh-secret-key"),
  ACCESS_TOKEN_EXPIRES:
    getEnv("ACCESS_TOKEN_EXPIRES") || getEnv("ACCESS_TOKEN_EXPIRY", "15m"),
  REFRESH_TOKEN_EXPIRES:
    getEnv("REFRESH_TOKEN_EXPIRES") || getEnv("REFRESH_TOKEN_EXPIRY", "7d"),

  EMAIL_USER: getEnv("EMAIL_USER", ""),
  EMAIL_PASS: getEnv("EMAIL_PASS", ""),
  RECEIVER_MAIL: getEnv("RECEIVER_MAIL", ""),
  APP_NAME: getEnv("APP_NAME", "App Name"),
};

export default env;
export { env };
