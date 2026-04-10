import * as userModel from "../models/userModel.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/generateToken.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, referral_id, role } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, "Name, email and password are required");
  }

  try {
    const newUser = await userModel.createUser({
      name,
      email,
      password,
      referral_id,
      role,
    });

    const accessToken = generateAccessToken(newUser);
    const refreshToken = generateRefreshToken(newUser);

    return res.status(201).json(
      new ApiResponse(
        201,
        {
          user: newUser,
          accessToken,
          refreshToken,
        },
        "User registered successfully",
      ),
    );
  } catch (error) {
    if (error.message === "Email already registered") {
      throw new ApiError(400, error.message);
    }
    throw error;
  }
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const user = await userModel.findUserByEmail(email);
  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  const isMatch = await userModel.comparePassword(password, user.password_hash);
  if (!isMatch) {
    throw new ApiError(401, "Invalid credentials");
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return res.json(
    new ApiResponse(
      200,
      {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        accessToken,
        refreshToken,
      },
      "Login successful",
    ),
  );
});

export const getProfile = asyncHandler(async (req, res) => {
  const user = await userModel.findUserById(req.user.id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res.json(
    new ApiResponse(200, user, "User profile fetched successfully"),
  );
});

export const refreshAccessToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    throw new ApiError(400, "Refresh token is required");
  }

  try {
    const decoded = verifyRefreshToken(refreshToken);
    const user = await userModel.findUserById(decoded.id);

    if (!user) {
      throw new ApiError(401, "User not found");
    }

    const accessToken = generateAccessToken(user);

    return res.json(
      new ApiResponse(
        200,
        { accessToken },
        "Access token refreshed successfully",
      ),
    );
  } catch (error) {
    throw new ApiError(
      401,
      error.message || "Invalid or expired refresh token",
    );
  }
});
