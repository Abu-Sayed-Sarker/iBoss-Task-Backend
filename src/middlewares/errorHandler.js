import ApiError from "../utils/ApiError.js";
import env from "../../env.js";

const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;

  if (!(err instanceof ApiError)) {
    statusCode =
      res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
    message = err.message || "Internal Server Error";
  }

  const response = {
    success: false,
    message,
    ...(env.NODE_ENV === "development" && { stack: err.stack }),
    ...(err.errors && { errors: err.errors }),
  };

  res.status(statusCode).json(response);
};

const notFound = (req, res, next) => {
  const error = new ApiError(404, `Route not found - ${req.originalUrl}`);
  next(error);
};

export { errorHandler, notFound };
