import swaggerJsdoc from "swagger-jsdoc";
import type { SwaggerOptions } from "swagger-jsdoc";

const options: SwaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "YourFeed API",
      version: "0.0.0",
      description: "",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development Server",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Insira o token JWT gerado no login/registro no formato: Bearer <seu_token>",
        },
      },
    },
  },
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);