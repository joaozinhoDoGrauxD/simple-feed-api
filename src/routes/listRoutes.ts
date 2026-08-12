import express from "express";
import {
  createListController,
  getListsController,
  addUrlToListController,
  removeUrlFromListController,
  deleteListController,
} from "@/controllers/listController";
import { authMiddleware } from "@/middlewares/authMiddleware";

const router = express.Router();

router.use(authMiddleware);

/**
 * @swagger
 * /api/lists:
 *   post:
 *     summary: Cria uma nova lista de URLs
 *     tags: [Lists]
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
 *               - urls
 *             properties:
 *               title:
 *                 type: string
 *                 example: Meus Feeds Favoritos
 *               urls:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["https://example.com/rss", "https://another.example.com/rss"]
 *     responses:
 *       201:
 *         description: Lista criada com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *   get:
 *     summary: Lista todas as listas do usuário autenticado
 *     tags: [Lists]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de listas retornada com sucesso
 *       401:
 *         description: Não autorizado
 */
router.post("/", createListController);
router.get("/", getListsController);

/**
 * @swagger
 * /api/lists/{id}/urls:
 *   patch:
 *     summary: Adiciona uma nova URL a uma lista existente
 *     tags: [Lists]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da lista
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - url
 *             properties:
 *               url:
 *                 type: string
 *                 example: https://new.example.com/rss
 *     responses:
 *       200:
 *         description: URL adicionada com sucesso
 *       404:
 *         description: Lista não encontrada
 *       401:
 *         description: Não autorizado
 *   delete:
 *     summary: Remove uma URL específica de dentro de uma lista
 *     tags: [Lists]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da lista
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - url
 *             properties:
 *               url:
 *                 type: string
 *                 example: https://example.com/rss
 *     responses:
 *       200:
 *         description: URL removida com sucesso
 *       404:
 *         description: Lista ou URL não encontrada
 *       401:
 *         description: Não autorizado
 */
router.patch("/:id/urls", addUrlToListController);
router.delete("/:id/urls", removeUrlFromListController);

/**
 * @swagger
 * /api/lists/{id}:
 *   delete:
 *     summary: Deleta uma lista específica inteira
 *     tags: [Lists]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da lista
 *     responses:
 *       200:
 *         description: Lista removida com sucesso
 *       404:
 *         description: Lista não encontrada
 *       401:
 *         description: Não autorizado
 */
router.delete("/:id", deleteListController);

export default router;