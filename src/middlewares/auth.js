import { verifyAccessToken } from "../utils/generateToken.js";

export default function auth(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const [scheme, token] = authHeader.trim().split(/\s+/);
  if (scheme?.toLowerCase() !== "bearer" || !token) {
    return res.status(401).json({ message: "User is not authenticated" });
  }

  try {
    const decoded = verifyAccessToken(token);
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };
    return next();
  } catch (err) {
    return res.status(401).json({ message: "User is not authorized" });
  }
}
