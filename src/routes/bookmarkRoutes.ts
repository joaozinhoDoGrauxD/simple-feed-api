import express from "express";
import {
  createBookmarkController,
  addItemToBookmarkController,
  getBookmarksController,
  deleteBookmarkController,
  removeItemFromBookmarkController,
} from "@/controllers/bookmarkController";
import { authMiddleware } from "@/middlewares/authMiddleware";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createBookmarkController);
router.get("/", getBookmarksController);
router.patch("/:id/items", addItemToBookmarkController);
router.delete("/:id", deleteBookmarkController);
router.delete("/:id/items", removeItemFromBookmarkController);

export default router;