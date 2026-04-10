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
  "/api/admin/auth/register": {
    post: {
      tags: ["Admin Auth"],
      summary: "Register a new admin",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/RegisterRequest" },
          },
        },
      },
      responses: {
        201: {
          description: "Admin registered successfully",
          content: {
            "application/json": {
              schema: {
                allOf: [
                  { $ref: "#/components/schemas/ApiResponse" },
                  {
                    type: "object",
                    properties: {
                      data: { $ref: "#/components/schemas/AuthData" },
                    },
                  },
                ],
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
        409: {
          description: "Email already registered",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ApiError" },
            },
          },
        },
      },
    },
  },
  "/api/admin/auth/login": {
    post: {
      tags: ["Admin Auth"],
      summary: "Login admin",
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
          description: "Admin logged in successfully",
          content: {
            "application/json": {
              schema: {
                allOf: [
                  { $ref: "#/components/schemas/ApiResponse" },
                  {
                    type: "object",
                    properties: {
                      data: { $ref: "#/components/schemas/AuthData" },
                    },
                  },
                ],
              },
            },
          },
        },
        401: {
          description: "Invalid password",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ApiError" },
            },
          },
        },
        404: {
          description: "Admin not found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ApiError" },
            },
          },
        },
      },
    },
  },
  "/api/admin/auth/profile": {
    get: {
      tags: ["Admin Auth"],
      summary: "Get admin profile",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "Admin profile fetched successfully",
          content: {
            "application/json": {
              schema: {
                allOf: [
                  { $ref: "#/components/schemas/ApiResponse" },
                  {
                    type: "object",
                    properties: {
                      data: { $ref: "#/components/schemas/Admin" },
                    },
                  },
                ],
              },
            },
          },
        },
        401: {
          description: "Admin is not authenticated",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ApiError" },
            },
          },
        },
      },
    },
  },
  "/api/admin/auth/all": {
    get: {
      tags: ["Admin Auth"],
      summary: "Get all admins",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "All admins fetched successfully",
          content: {
            "application/json": {
              schema: {
                allOf: [
                  { $ref: "#/components/schemas/ApiResponse" },
                  {
                    type: "object",
                    properties: {
                      data: {
                        type: "array",
                        items: { $ref: "#/components/schemas/Admin" },
                      },
                    },
                  },
                ],
              },
            },
          },
        },
        401: {
          description: "Admin is not authenticated",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ApiError" },
            },
          },
        },
      },
    },
  },
  "/api/contact/send": {
    post: {
      tags: ["Contact"],
      summary: "Send contact information",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ContactRequest" },
          },
        },
      },
      responses: {
        200: {
          description: "Message sent successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ApiResponse" },
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
  "/api/contact/subscribe": {
    post: {
      tags: ["Contact"],
      summary: "Subscribe to newsletter",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/SubscribeRequest" },
          },
        },
      },
      responses: {
        200: {
          description: "Message sent successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ApiResponse" },
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
  "/api/contact/book-a-call": {
    post: {
      tags: ["Contact"],
      summary: "Book a call",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/CallRequest" },
          },
        },
      },
      responses: {
        200: {
          description: "Message sent successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ApiResponse" },
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
};
