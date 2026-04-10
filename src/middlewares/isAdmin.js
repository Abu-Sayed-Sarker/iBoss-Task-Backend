import ApiError from "../utils/ApiError.js";

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return next(new ApiError(403, "Access denied. Admin role required."));
};

export default isAdmin;
