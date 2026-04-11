import * as testModel from "../models/testModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

export const addTest = asyncHandler(async (req, res) => {
  const { title, candidates, start_time, end_time, duration, slots, question_set, question_type } = req.body;

  if (!title) {
    throw new ApiError(400, "Title is required");
  }

  const newTest = await testModel.createTest({
    title,
    candidates,
    start_time,
    end_time,
    duration,
    slots,
    question_set,
    question_type,
  });

  return res.status(201).json(
    new ApiResponse(201, newTest, "Test created successfully")
  );
});

export const updateTest = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  const test = await testModel.findTestById(id);
  if (!test) {
    throw new ApiError(404, "Test not found");
  }

  const updatedTest = await testModel.updateTest(id, req.body);

  return res.json(
    new ApiResponse(200, updatedTest, "Test updated successfully")
  );
});

export const deleteTest = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const test = await testModel.findTestById(id);
  if (!test) {
    throw new ApiError(404, "Test not found");
  }

  await testModel.deleteTest(id);

  return res.json(
    new ApiResponse(200, { id }, "Test deleted successfully")
  );
});

export const getTests = asyncHandler(async (req, res) => {
  const tests = await testModel.getAllTests();
  return res.json(
    new ApiResponse(200, tests, "Tests fetched successfully")
  );
});

export const getTestDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const test = await testModel.findTestWithQuestionsById(id);
  
  if (!test) {
    throw new ApiError(404, "Test not found");
  }

  return res.json(
    new ApiResponse(200, test, "Test details fetched successfully")
  );
});
