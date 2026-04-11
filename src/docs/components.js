export const components = {
  securitySchemes: {
    bearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    },
  },
  schemas: {
    ApiResponse: {
      type: "object",
      properties: {
        statusCode: { type: "integer", example: 200 },
        data: { type: "object", nullable: true, additionalProperties: true },
        message: { type: "string", example: "Success" },
        success: { type: "boolean", example: true },
      },
    },
    ApiError: {
      type: "object",
      properties: {
        success: { type: "boolean", example: false },
        message: { type: "string", example: "Something went wrong" },
        errors: {
          type: "array",
          items: { type: "string" },
          nullable: true,
        },
        stack: { type: "string", nullable: true },
      },
    },
    Admin: {
      type: "object",
      properties: {
        id: { type: "integer", example: 1 },
        email: { type: "string", format: "email", example: "admin@mail.com" },
        role: { type: "string", example: "admin" },
        created_at: { type: "string", format: "date-time" },
      },
    },
    AuthData: {
      type: "object",
      properties: {
        admin: { $ref: "#/components/schemas/Admin" },
        accessToken: { type: "string" },
        refreshToken: { type: "string" },
      },
    },
    RegisterRequest: {
      type: "object",
      required: ["email", "password"],
      properties: {
        email: { type: "string", format: "email", example: "admin@mail.com" },
        password: { type: "string", example: "SecurePass123!" },
      },
    },
    LoginRequest: {
      type: "object",
      required: ["email", "password"],
      properties: {
        email: { type: "string", format: "email", example: "admin@mail.com" },
        password: { type: "string", example: "SecurePass123!" },
      },
    },
    User: {
      type: "object",
      properties: {
        id: { type: "integer", example: 1 },
        name: { type: "string", example: "John Doe" },
        email: { type: "string", format: "email", example: "user@mail.com" },
        referral_id: { type: "string", example: "REF123" },
        role: { type: "string", example: "user" },
        created_at: { type: "string", format: "date-time" },
      },
    },
    UserRegisterRequest: {
      type: "object",
      required: ["name", "email", "password"],
      properties: {
        name: { type: "string", example: "John Doe" },
        email: { type: "string", format: "email", example: "user@mail.com" },
        password: { type: "string", example: "password123" },
        referral_id: { type: "string", example: "REF123" },
        role: { type: "string", example: "user", enum: ["user", "admin"] },
      },
    },
    UserAuthData: {
      type: "object",
      properties: {
        message: { type: "string", example: "Login successful" },
        user: { $ref: "#/components/schemas/User" },
        accessToken: { type: "string" },
        refreshToken: { type: "string" },
      },
    },
    RefreshTokenRequest: {
      type: "object",
      required: ["refreshToken"],
      properties: {
        refreshToken: { type: "string" },
      },
    },
    RefreshTokenResponse: {
      type: "object",
      properties: {
        accessToken: { type: "string" },
      },
    },
    Test: {
      type: "object",
      properties: {
        id: { type: "integer" },
        title: { type: "string" },
        candidates: { type: "string", format: "date" },
        start_time: { type: "string" },
        end_time: { type: "string" },
        duration: { type: "string" },
        slots: { type: "integer" },
        question_set: { type: "string" },
        question_type: { type: "string" },
        questions: {
          type: "array",
          items: { $ref: "#/components/schemas/Question" },
        },
        is_submitted: { type: "boolean", example: false },
        submission_count: { type: "integer", example: 10 },
      },
    },
    Question: {
      type: "object",
      required: ["test_id", "question"],
      properties: {
        id: { type: "integer" },
        test_id: { type: "integer" },
        question: { type: "string" },
        description: { type: "string", nullable: true },
        options: {
          type: "array",
          items: {
            type: "object",
            properties: {
              label: { type: "string" },
              isCorrect: { type: "boolean" },
            },
          },
        },
        points: { type: "string" },
        type: { type: "string", example: "MCQ" },
      },
    },
    UserExam: {
      type: "object",
      properties: {
        id: { type: "integer" },
        user_id: { type: "integer" },
        test_id: { type: "integer" },
        score: { type: "number" },
        is_submitted: { type: "boolean" },
        started_at: { type: "string", format: "date-time" },
        submitted_at: { type: "string", format: "date-time", nullable: true },
        test_title: { type: "string", nullable: true },
      },
    },
  },
};
