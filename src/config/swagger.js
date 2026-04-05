const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Finance Dashboard Backend API",
      version: "1.0.0",
      description:
        "A comprehensive financial management API with role-based access control",
    },
    servers: [
      {
        url: "https://zorvyn-backend-5nrb.onrender.com",
        description: "Production Server",
      },
      {
        url: "http://localhost:3000",
        description: "Development Server",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const specs = swaggerJsdoc(options);
module.exports = specs;
