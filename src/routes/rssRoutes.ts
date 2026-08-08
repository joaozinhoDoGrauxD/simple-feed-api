import express from "express";

import { rssItemsController } from "@/controllers/rssItemsController";
import { rssContentController } from "@/controllers/contentController";

const router = express.Router();

/**
 * @swagger
 * /api/rss/items:
 *   post:
 *     summary: Busca e processa os itens de um feed RSS/Atom
 *     tags: [RSS]
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
 *                 example: https://www.example.com/rss
 *     responses:
 *       200:
 *         description: Itens do RSS retornados com sucesso
 *       400:
 *         description: URL obrigatória ausente
 */
router.post("/items", rssItemsController);

/**
 * @swagger
 * /api/rss/check:
 *   post:
 *     summary: Verifica os tipos de conteúdo dos arquivos anexados no RSS
 *     tags: [RSS]
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
 *                 example: https://www.example.com/rss
 *     responses:
 *       200:
 *         description: Mapeamento de arquivos e tipos verificado com sucesso
 *       400:
 *         description: URL obrigatória ausente
 */
router.post("/check", rssContentController);

export default router;
