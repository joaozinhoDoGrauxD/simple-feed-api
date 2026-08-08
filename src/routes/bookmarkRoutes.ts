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

/**
 * @swagger
 * /api/bookmarks:
 *   post:
 *     summary: Cria uma nova pasta de bookmarks
 *     tags: [Bookmarks]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: My favorite posts
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                 example: []
 *     responses:
 *       201:
 *         description: Pasta criada com sucesso
 *   get:
 *     summary: Retorna todas as pastas de bookmarks do usuário
 *     tags: [Bookmarks]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pastas retornada com sucesso
 */
router.post("/", createBookmarkController);
router.get("/", getBookmarksController);

/**
 * @swagger
 * /api/bookmarks/{id}/items:
 *   patch:
 *     summary: Adiciona um item JSON dinâmico a uma pasta de bookmark
 *     tags: [Bookmarks]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da pasta de bookmark
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - data
 *             properties:
 *               data:
 *                 type: object
 *                 example:
 *                   title: "Me at the zoo"
 *                   website: "youtube.com"
 *                   timestamp: 1785387352000
 *     responses:
 *       200:
 *         description: Item adicionado com sucesso
 *   delete:
 *     summary: Remove um item específico de dentro da pasta usando o ID do item
 *     tags: [Bookmarks]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da pasta de bookmark
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - itemId
 *             properties:
 *               itemId:
 *                 type: string
 *                 example: a1b2c3d4-e5f6-7890-abcd-ef1234567890
 *     responses:
 *       200:
 *         description: Item removido com sucesso
 */
router.patch("/:id/items", addItemToBookmarkController);
router.delete("/:id/items", removeItemFromBookmarkController);

/**
 * @swagger
 * /api/bookmarks/{id}:
 *   delete:
 *     summary: Deleta uma pasta de bookmark inteira
 *     tags: [Bookmarks]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da pasta
 *     responses:
 *       200:
 *         description: Pasta deletada com sucesso
 */
router.delete("/:id", deleteBookmarkController);

export default router;