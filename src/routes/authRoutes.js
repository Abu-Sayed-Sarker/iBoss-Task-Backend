import express from "express";
import * as authController from "../controllers/userController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/refresh-token", authController.refreshAccessToken);
router.get("/profile", auth, authController.getProfile);

export default router;
