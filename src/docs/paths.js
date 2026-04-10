export const paths = {
  "/health": {
    get: {
      tags: ["Health"],
      summary: "Health check",
      responses: {
        200: {
          description: "OK",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: { status: { type: "string", example: "ok" } },
              },
            },
          },
        },
      },
    },
  },
  "/api/auth/register": {
    post: {
      tags: ["Auth"],
      summary: "Register a new user/admin",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/UserRegisterRequest" },
          },
        },
      },
      responses: {
        201: {
          description: "User registered successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string" },
                  user: { $ref: "#/components/schemas/User" },
                  accessToken: { type: "string" },
                  refreshToken: { type: "string" },
                },
              },
            },
          },
        },
        400: {
          description: "Validation error",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ApiError" },
            },
          },
        },
      },
    },
  },
  "/api/auth/login": {
    post: {
      tags: ["Auth"],
      summary: "Login user/admin",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/LoginRequest" },
          },
        },
      },
      responses: {
        200: {
          description: "Login successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UserAuthData" },
            },
          },
        },
        401: {
          description: "Invalid credentials",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ApiError" },
            },
          },
        },
      },
    },
  },
  "/api/auth/refresh-token": {
    post: {
      tags: ["Auth"],
      summary: "Refresh access token",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/RefreshTokenRequest" },
          },
        },
      },
      responses: {
        200: {
          description: "Access token refreshed successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/RefreshTokenResponse" },
            },
          },
        },
        401: {
          description: "Invalid or expired refresh token",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ApiError" },
            },
          },
        },
      },
    },
  },
  "/api/auth/profile": {
    get: {
      tags: ["Auth"],
      summary: "Get user/admin profile",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "Profile fetched successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/User" },
            },
          },
        },
        401: {
          description: "Not authenticated",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ApiError" },
            },
          },
        },
      },
    },
  },
};
