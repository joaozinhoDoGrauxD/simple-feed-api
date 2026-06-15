import express from "express";
import cors from "cors";
import rssRoutes from "./routes/rssRoutes";
const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());
app.use("/api/rss", rssRoutes);
export { app, PORT };
