import {
  createAdmin,
  findAdminByEmail,
  findAdminById,
  comparePassword,
  ensureAdminTable,
  getAllAdmins,
} from "../../models/adminModel.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/generateToken.js";
import asyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

export const registerAdmin = asyncHandler(async (req, res) => {
  await ensureAdminTable();
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  if (password.length < 6) {
    throw new ApiError(400, "Password must be at least 6 characters");
  }

  const existing = await findAdminByEmail(email);
  if (existing) {
    throw new ApiError(409, "Email already registered");
  }

  const admin = await createAdmin({ email, password });
  const accessToken = generateAccessToken(admin);
  const refreshToken = generateRefreshToken(admin);

  return res.status(201).json(
    new ApiResponse(
      201,
      { admin, accessToken, refreshToken },
      "Admin registered successfully"
    )
  );
});

export const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const admin = await findAdminByEmail(email);
  if (!admin) {
    throw new ApiError(404, "Admin not found");
  }

  const isPasswordValid = await comparePassword(password, admin.password_hash);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid password");
  }

  const accessToken = generateAccessToken(admin);
  const refreshToken = generateRefreshToken(admin);

  return res.status(200).json(
    new ApiResponse(
      200,
      { admin: { id: admin.id, email: admin.email, role: admin.role }, accessToken, refreshToken },
      "Admin logged in successfully"
    )
  );
});

export const getAdminProfile = asyncHandler(async (req, res) => {
  const adminId = req.user?.id;
  if (!adminId) {
    throw new ApiError(401, "Admin is not authenticated");
  }

  const admin = await findAdminById(adminId);
  if (!admin) {
    throw new ApiError(404, "Admin not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, admin, "Admin profile fetched successfully"));
});

export const getAllAdminsController = asyncHandler(async (req, res) => {
  const adminId = req.user?.id;
  if (!adminId) {
    throw new ApiError(401, "Admin is not authenticated");
  }

  const admins = await getAllAdmins();
  return res
    .status(200)
    .json(
      new ApiResponse(200, admins, "All admins fetched successfully")
    );
});
