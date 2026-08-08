import swaggerJsdoc from "swagger-jsdoc";
import type { Options } from "swagger-jsdoc"

type serverSpecs = {
  url: string,
  description: string
}

  let serverJson;

const myServer = (): serverSpecs => {
  if (process.env.BUN_ENV === 'production') {
    serverJson = {
      url: "https://simple-feed-api.onrender.com/",
      description: "Production Server"
    }
  } else {
    serverJson = {
      url: "http://localhost:3000",
      description: "Development Server",
    }
  }

  return serverJson;
}

const server = myServer()
const options: Options = {
  definition: {
    openapi: "3.0.0",
    schemes: ["http", "https"],
    info: {
      title: "YourFeed API",
      version: "0.0.0",
      description: "",
    },
    servers: [
      server
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