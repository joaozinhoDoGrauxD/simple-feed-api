import express from "express";
import { registerController, loginController } from "@/controllers/authController";

const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: hunter2
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso e token retornado
 *       400:
 *         description: Usuário já existe ou campos inválidos
 */
router.post("/register", registerController);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Realiza o login do usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: hunter2
 *     responses:
 *       200:
 *         description: Login bem-sucedido com retorno do token JWT
 *       400:
 *         description: Credenciais inválidas
 */
router.post("/login", loginController);

export default router;