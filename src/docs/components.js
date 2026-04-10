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
    ContactRequest: {
      type: "object",
      required: ["name", "email", "number", "source"],
      properties: {
        name: { type: "string", example: "Jane Doe" },
        email: { type: "string", format: "email", example: "jane@mail.com" },
        number: { type: "string", example: "1234567890" },
        source: { type: "string", example: "Website" },
      },
    },
    SubscribeRequest: {
      type: "object",
      required: ["email"],
      properties: {
        email: { type: "string", format: "email", example: "jane@mail.com" },
      },
    },
    CallRequest: {
      type: "object",
      required: ["phone"],
      properties: {
        phone: { type: "string", example: "1234567890" },
      },
    },
  },
};
