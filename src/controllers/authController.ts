import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppDataSource } from "@/config/data-source";
import { User } from "@/entities/User";
import { OAuth2Client } from "google-auth-library";

const userRepository = AppDataSource.getMongoRepository(User);
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateAuthToken = (userId: string) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET não foi definido");
  }

  const expiresIn = (process.env.JWT_EXPIRES_IN || "1d") as jwt.SignOptions["expiresIn"];

  const token = jwt.sign({ userId }, secret, { expiresIn });

  const decoded = jwt.decode(token) as { exp: number };
  const expirationDate = new Date(decoded.exp * 1000);

  return {
    token,
    expiry_raw: expiresIn,
    expiry_timestamp: expirationDate.getTime(),
    expiry_formatted_date: expirationDate.toLocaleString("pt-BR"),
  };
};

export const registerController = async (req: Request, res: Response) => {
  const { username, email, password} = req.body;

  try {
    const existingUser = await userRepository.findOneBy({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Usuário já existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = userRepository.create({
      username,
      email,
      password: hashedPassword,
    });

    await userRepository.save(user);

    const tokenData = generateAuthToken(user.id.toString());

    return res.status(201).json({
      message: "Usuário criado",
      ...tokenData,
    });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({ message: "Erro ao registrar usuário" });
  }
};

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await userRepository.findOneBy({ email });
    if (!user) {
      return res.status(400).json({ message: "Credenciais inválidas" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Credenciais inválidas" });
    }

    const tokenData = generateAuthToken(user.id.toString());

    return res.status(200).json(tokenData);
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Erro ao realizar login" });
  }
};

export const googleAuthController = async (req: Request, res: Response) => {
  const { idToken } = req.body;

  try {
    // 1. Valida o ID Token permitindo o Client ID Web do Expo
    const allowedAudiences = [
      process.env.GOOGLE_CLIENT_ID,
      process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    ].filter(Boolean) as string[];

    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: allowedAudiences.length > 0 ? allowedAudiences : undefined,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      return res.status(400).json({ message: "Token do Google inválido" });
    }

    const { email } = payload;

    // 2. Busca ou cria o usuário mantendo seu User.ts (TypeORM + MongoDB)
    let user = await userRepository.findOneBy({ email });

    if (!user) {
      user = userRepository.create({
        email,
        password: "", // Senha vazia pois foi via OAuth
      });
      await userRepository.save(user);
    }

    // 3. Extrai o ID do ObjectId do MongoDB com segurança
    const userId = user.id ? user.id.toString() : (user as any)._id?.toString();
    const tokenData = generateAuthToken(userId);

    return res.status(200).json(tokenData);
  } catch (error) {
    console.error("Google Auth Error:", error);
    return res.status(500).json({ message: "Erro ao autenticar com o Google" });
  }
};