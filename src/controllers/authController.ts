import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppDataSource } from "@/config/data-source";
import { User } from "@/entities/User";

const userRepository = AppDataSource.getMongoRepository(User);

export const registerController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email e senha são obrigatórios" });
  }

  try {
    const existingUser = await userRepository.findOneBy({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Usuário já existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = userRepository.create({
      email,
      password: hashedPassword,
    });

    await userRepository.save(user);

    const secret = process.env.JWT_SECRET || "default_secret";
    const token = jwt.sign({ userId: user.id.toString() }, secret, { expiresIn: "7d" });

    return res.status(201).json({ message: "Usuário criado", token });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({ message: "Erro ao registrar usuário" });
  }
};

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email e senha são obrigatórios" });
  }

  try {
    const user = await userRepository.findOneBy({ email });
    if (!user) {
      return res.status(400).json({ message: "Credenciais inválidas" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Credenciais inválidas" });
    }

    const secret = process.env.JWT_SECRET || "default_secret";
    const token = jwt.sign({ userId: user.id.toString() }, secret, { expiresIn: "7d" });

    return res.status(200).json({ token });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Erro ao realizar login" });
  }
};