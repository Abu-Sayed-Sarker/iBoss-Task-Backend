import ApiError from "../utils/ApiError.js";
import { verifyAccessToken } from "../utils/generateToken.js";

const isAdmin = (req, res, next) => {
  /// decode token and check role

  const token = req.headers.authorization?.split(" ")[1];
  const decoded = verifyAccessToken(token);

  console.log(decoded.role);

  if (decoded.role === "admin") {
    return next();
  }
  return next(new ApiError(403, "Access denied. Admin role required."));
};

export default isAdmin;
