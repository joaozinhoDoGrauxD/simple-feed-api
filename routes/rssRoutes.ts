import express from "express";

import { rssController } from "../controllers/rssController";

const router = express.Router();

router.post("/rss", rssController);

export default router;
