import express from "express";
import { registerController, loginController, googleAuthController } from "@/controllers/authController";
import { validateSchema } from "@/middlewares/validateSchema";
import { registerSchema, loginSchema } from "@/types/authSchema";
import { googleAuthSchema } from "@/types/authSchema";

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
router.post("/register", validateSchema(registerSchema), registerController);

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
router.post("/login", validateSchema(loginSchema), loginController);
/**
 * @swagger
 * /api/auth/google:
 *   post:
 *     summary: Realiza o login pelo OAUth 2.0 do Google
 *     tags: [Auth]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *           type: object
 *           required:
 *             - idToken
 *           properties:
 *             idToken:
 *              type: string
 *              example: (Client ID) 
 *     responses:
 *       200:
 *         description: Login bem-sucedido com retorno do token  do GoogleOAuth 2.0
 *       400:
 *         description: Não foi possível fazer o login com OAuth 2.0
 */
router.post("/google", validateSchema(googleAuthSchema), googleAuthController);
export default router;