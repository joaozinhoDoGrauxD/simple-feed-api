import express from "express";
import {
  createListController,
  getListsController,
  addUrlToListController,
  deleteListController,
} from "@/controllers/listController";
import { authMiddleware } from "@/middlewares/authMiddleware";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createListController);
router.get("/", getListsController);
router.patch("/:id/urls", addUrlToListController);
router.delete("/:id", deleteListController);

export default router;