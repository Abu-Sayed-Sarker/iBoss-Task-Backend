import express from "express";
import auth from "../../middlewares/auth.js";
import {
  registerAdmin,
  loginAdmin,
  getAdminProfile,
  getAllAdminsController,
} from "../../controllers/admin/authController.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/profile", auth, getAdminProfile);
router.get("/all", auth, getAllAdminsController);

export default router;
