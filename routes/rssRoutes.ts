import express from "express";

import { rssItemsController } from "@/controllers/rssItemsController";
import { rssContentController } from "@/controllers/contentController";

const router = express.Router();

router.post("/items", rssItemsController);
router.post("/check", rssContentController);

export default router;
