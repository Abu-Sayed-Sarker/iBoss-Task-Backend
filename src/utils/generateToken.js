import jwt from "jsonwebtoken";
import env from "../../env.js";

const accessTokenSecret = env.ACCESS_TOKEN_SECRET || "access-secret-key";
const refreshTokenSecret = env.REFRESH_TOKEN_SECRET || "refresh-secret-key";
const accessTokenExpiry = env.ACCESS_TOKEN_EXPIRES || "15m";
const refreshTokenExpiry = env.REFRESH_TOKEN_EXPIRES || "7d";

export const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    accessTokenSecret,
    { expiresIn: accessTokenExpiry }
  );
};

export const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    refreshTokenSecret,
    { expiresIn: refreshTokenExpiry }
  );
};

export const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, accessTokenSecret);
  } catch (err) {
    throw new Error("Invalid or expired access token");
  }
};

export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, refreshTokenSecret);
  } catch (err) {
    throw new Error("Invalid or expired refresh token");
  }
};
