const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Finance Dashboard Backend API",
      version: "1.0.0",
      description:
        "A comprehensive financial management API with role-based access control, JWT authentication, and advanced analytics",
      contact: {
        name: "Zorvyn Finance",
        url: "https://github.com/venkatesh58285/zorvyn_backend",
      },
    },
    servers: [
      {
        url: "https://zorvyn-backend-5nrb.onrender.com",
        description: "Production Server (Render)",
      },
      {
        url: "http://localhost:3000",
        description: "Development Server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "JWT token obtained from login endpoint",
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
};

const specs = swaggerJsdoc(options);
module.exports = specs;
