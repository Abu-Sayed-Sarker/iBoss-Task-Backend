import express from "express";
import * as testController from "../controllers/testController.js";
import auth from "../middlewares/auth.js";
import isAdmin from "../middlewares/isAdmin.js";

const router = express.Router();

// Admin relative routes
router.post("/add", auth, isAdmin, testController.addTest);
router.patch("/update/:id", auth, isAdmin, testController.updateTest);
router.delete("/delete/:id", auth, isAdmin, testController.deleteTest);

// Public or User routes (if needed)
router.get("/all", auth, testController.getTests);

export default router;
