import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { connectDB, disconnectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import { buildOpenApiSpec } from "./docs/openapi.js";
import { notFound, errorHandler } from "./middlewares/errorHandler.js";
import { ensureAdminTable } from "./models/adminModel.js";
import { ensureUsersTable } from "./models/userModel.js";
import { ensureTestsTable } from "./models/testModel.js";
import testRoutes from "./routes/testRoutes.js";
import env from "../env.js";

///// connect to database and ensure tables exist///
await connectDB();
await ensureAdminTable();
await ensureUsersTable();
await ensureTestsTable();
// await ensureServicesTables();

const app = express();
const port = env.PORT || 5001;

// Core middlewares
app.use(cors());
app.use(express.json());
app.set("trust proxy", true);

const getBaseUrl = (req) => {
  if (env.API_BASE_URL) return env.API_BASE_URL;
  const queryBaseUrl = req.query?.baseUrl;
  if (typeof queryBaseUrl === "string" && queryBaseUrl.trim()) {
    return queryBaseUrl.trim();
  }
  return "/";
};

// API docs
app.get("/api/docs.json", (req, res) => {
  res.json(buildOpenApiSpec({ baseUrl: getBaseUrl(req) }));
});
app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(null, {
    explorer: true,
    swaggerOptions: { url: "/api/docs.json" },
  }),
);

// Health check
app.get("/health", (req, res) => res.json({ status: "ok" }));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/tests", testRoutes);

// 404 and error handler
app.use(notFound);
app.use(errorHandler);

const host = "0.0.0.0";

const server = app.listen(port, host, () => {
  console.log(`Server running on http://${host}:${port}`);
});

// handle unhandled promise rejections
process.on("unhandledRejection", (error) => {
  console.error(`Unhandled promise rejection: ${error.message}`);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

// handle uncaught exceptions
process.on("uncaughtException", async (error) => {
  console.error(`Uncaught exception: ${error.message}`);
  await disconnectDB();
  process.exit(1);
});

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM signal received: shutting down gracefully");
  await disconnectDB();
  process.exit(0);
});
