import { Router } from "express";
import * as examController from "../controllers/examController.js";
import auth from "../middlewares/auth.js";

const router = Router();

router.post("/start", auth, examController.startExam);
router.post("/submit-answer", auth, examController.submitAnswer);
router.post("/finalize", auth, examController.finalizeExam);
router.get("/my-results", auth, examController.getMyResults);

export default router;
