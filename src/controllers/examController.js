import * as examModel from "../models/examModel.js";
import * as questionModel from "../models/questionModel.js";
import * as testModel from "../models/testModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

export const startExam = asyncHandler(async (req, res) => {
    const { testId } = req.body;
    const userId = req.user.id;

    if (!testId) {
        throw new ApiError(400, "Test ID is required");
    }

    const test = await testModel.findTestById(testId);
    if (!test) {
        throw new ApiError(404, "Test not found");
    }

    const examStatus = await examModel.getUserExamStatus(userId, testId);
    if (examStatus?.is_submitted) {
        throw new ApiError(400, "You have already submitted this exam");
    }

    const userExam = await examModel.startExam(userId, testId);

    return res.status(200).json(
        new ApiResponse(200, userExam, "Exam started successfully")
    );
});

export const submitAnswer = asyncHandler(async (req, res) => {
    const { testId, questionId, selectedOptionIndex } = req.body;
    const userId = req.user.id;

    const userExam = await examModel.getUserExamStatus(userId, testId);
    if (!userExam) {
        throw new ApiError(400, "Exam not started");
    }

    if (userExam.is_submitted) {
        throw new ApiError(400, "Exam already submitted");
    }

    const question = await questionModel.findQuestionById(questionId);
    if (!question) {
        throw new ApiError(404, "Question not found");
    }

    // Check if the answer is correct
    const options = question.options; // This is JSONB, so it should be an array
    const isCorrect = options[selectedOptionIndex]?.isCorrect || false;
    const points = isCorrect ? (parseFloat(question.points) || 1) : 0;

    await examModel.saveAnswer(userExam.id, questionId, selectedOptionIndex, isCorrect, points);

    return res.status(200).json(
        new ApiResponse(200, { isCorrect }, "Answer saved successfully")
    );
});

export const finalizeExam = asyncHandler(async (req, res) => {
    const { testId } = req.body;
    const userId = req.user.id;

    const userExam = await examModel.getUserExamStatus(userId, testId);
    if (!userExam) {
        throw new ApiError(400, "Exam not started");
    }

    if (userExam.is_submitted) {
        return res.status(200).json(
            new ApiResponse(200, userExam, "Exam already submitted")
        );
    }

    const finalizedExam = await examModel.submitExam(userExam.id);

    return res.status(200).json(
        new ApiResponse(200, finalizedExam, "Exam submitted successfully. Here is your feedback.")
    );
});

export const getMyResults = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const results = await examModel.getUserExamResults(userId);

    return res.status(200).json(
        new ApiResponse(200, results, "Exam results fetched successfully")
    );
});
