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
  "/api/auth/admin-register": {
    post: {
      tags: ["Auth"],
      summary: "Register a new admin account",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/AdminRegisterRequest" },
          },
        },
      },
      responses: {
        201: {
          description: "Admin account created successfully",
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
  "/api/tests/add": {
    post: {
      tags: ["Tests"],
      summary: "Add a new test (Admin only)",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Test" },
          },
        },
      },
      responses: {
        201: {
          description: "Test created successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ApiResponse" },
            },
          },
        },
      },
    },
  },
  "/api/tests/update/{id}": {
    patch: {
      tags: ["Tests"],
      summary: "Update a test by ID (Admin only)",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "integer" },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Test" },
          },
        },
      },
      responses: {
        200: {
          description: "Test updated successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ApiResponse" },
            },
          },
        },
      },
    },
  },
  "/api/tests/delete/{id}": {
    delete: {
      tags: ["Tests"],
      summary: "Delete a test by ID (Admin only)",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "integer" },
        },
      ],
      responses: {
        200: {
          description: "Test deleted successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ApiResponse" },
            },
          },
        },
      },
    },
  },
  "/api/tests/{id}": {
    get: {
      tags: ["Tests"],
      summary: "Get test details by ID",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "integer" },
        },
      ],
      responses: {
        200: {
          description: "Test details fetched successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Test" },
            },
          },
        },
        404: {
          description: "Test not found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ApiError" },
            },
          },
        },
      },
    },
  },
  "/api/tests/all": {
    get: {
      tags: ["Tests"],
      summary: "Get all tests",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "Tests fetched successfully",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/Test" },
              },
            },
          },
        },
      },
    },
  },
  "/api/questions": {
    post: {
      tags: ["Questions"],
      summary: "Add a new question to a test (Admin only)",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Question" },
          },
        },
      },
      responses: {
        201: {
          description: "Question created successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ApiResponse" },
            },
          },
        },
      },
    },
  },
  "/api/questions/{id}": {
    patch: {
      tags: ["Questions"],
      summary: "Update a question by ID (Admin only)",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "integer" },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Question" },
          },
        },
      },
      responses: {
        200: {
          description: "Question updated successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ApiResponse" },
            },
          },
        },
      },
    },
    delete: {
      tags: ["Questions"],
      summary: "Delete a question by ID (Admin only)",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "integer" },
        },
      ],
      responses: {
        200: {
          description: "Question deleted successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ApiResponse" },
            },
          },
        },
      },
    },
  },
  "/api/questions/test/{testId}": {
    get: {
      tags: ["Questions"],
      summary: "Get all questions for a specific test",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "testId",
          in: "path",
          required: true,
          schema: { type: "integer" },
        },
      ],
      responses: {
        200: {
          description: "Questions fetched successfully",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/Question" },
              },
            },
          },
        },
      },
    },
  },
  "/api/exams/start": {
    post: {
      tags: ["Exams"],
      summary: "Start an exam for a test",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["testId"],
              properties: { testId: { type: "integer" } },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Exam started",
          content: { "application/json": { schema: { $ref: "#/components/schemas/ApiResponse" } } },
        },
      },
    },
  },
  "/api/exams/submit-answer": {
    post: {
      tags: ["Exams"],
      summary: "Submit an answer for a question",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["testId", "questionId", "selectedOptionIndex"],
              properties: {
                testId: { type: "integer" },
                questionId: { type: "integer" },
                selectedOptionIndex: { type: "integer" },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Answer submitted",
          content: { "application/json": { schema: { $ref: "#/components/schemas/ApiResponse" } } },
        },
      },
    },
  },
  "/api/exams/finalize": {
    post: {
      tags: ["Exams"],
      summary: "Finalize and submit the entire exam",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["testId"],
              properties: { testId: { type: "integer" } },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Exam finalized with score",
          content: { "application/json": { schema: { $ref: "#/components/schemas/ApiResponse" } } },
        },
      },
    },
  },
  "/api/exams/my-results": {
    get: {
      tags: ["Exams"],
      summary: "Get current user's exam results",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "Results fetched",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/UserExam" },
              },
            },
          },
        },
      },
    },
  },
};
