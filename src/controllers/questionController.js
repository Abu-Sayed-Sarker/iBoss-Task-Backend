import * as questionModel from "../models/questionModel.js";
import * as testModel from "../models/testModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

export const addQuestion = asyncHandler(async (req, res) => {
  const { test_id, question, description, options, points, type } = req.body;

  if (!test_id || !question) {
    throw new ApiError(400, "Test ID and question text are required");
  }

  // Check if test exists
  const test = await testModel.findTestById(test_id);
  if (!test) {
    throw new ApiError(404, "Test not found");
  }

  const newQuestion = await questionModel.createQuestion({
    test_id,
    question,
    description,
    options,
    points,
    type,
  });

  return res.status(201).json(
    new ApiResponse(201, newQuestion, "Question added successfully")
  );
});

export const updateQuestion = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const questionObj = await questionModel.findQuestionById(id);
  if (!questionObj) {
    throw new ApiError(404, "Question not found");
  }

  const updatedQuestion = await questionModel.updateQuestion(id, req.body);

  return res.json(
    new ApiResponse(200, updatedQuestion, "Question updated successfully")
  );
});

export const deleteQuestion = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const questionObj = await questionModel.findQuestionById(id);
  if (!questionObj) {
    throw new ApiError(404, "Question not found");
  }

  await questionModel.deleteQuestion(id);

  return res.json(
    new ApiResponse(200, { id }, "Question deleted successfully")
  );
});

export const getQuestionsByTest = asyncHandler(async (req, res) => {
  const { testId } = req.params;

  const test = await testModel.findTestById(testId);
  if (!test) {
    throw new ApiError(404, "Test not found");
  }

  const questions = await questionModel.getQuestionsByTestId(testId);

  return res.json(
    new ApiResponse(200, questions, "Questions fetched successfully")
  );
});
