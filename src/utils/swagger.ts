import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Finance Backend API",
      version: "1.0.0",
      description: "API documentation for Finance Dashboard Backend",
    },
    servers: [
      {
        url: "https://finance-dashboard-bk.onrender.com",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"], // where docs will be written
};

export const swaggerSpec = swaggerJsdoc(options);