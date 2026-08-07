import express from "express";
import cors from "cors";
import rssRoutes from "./src/routes/rssRoutes";
import authRoutes from "./src/routes/authRoutes";
import listRoutes from "./src/routes/listRoutes";
import bookmarkRoutes from "./src/routes/bookmarkRoutes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./src/config/swagger";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/rss", rssRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/lists", listRoutes);
app.use("/api/bookmarks", bookmarkRoutes);

export { app, PORT };