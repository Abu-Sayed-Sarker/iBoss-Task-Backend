import { Router } from "express";
import * as questionController from "../controllers/questionController.js";

const router = Router();

router.post("/", questionController.addQuestion);
router.patch("/:id", questionController.updateQuestion);
router.delete("/:id", questionController.deleteQuestion);
router.get("/test/:testId", questionController.getQuestionsByTest);

export default router;
