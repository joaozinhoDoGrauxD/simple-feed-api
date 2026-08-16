import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token de acesso não fornecido" });
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ message: "Formato de token inválido" });
  }

  const token = parts[1];
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    console.error("JWT_SECRET não definido");
    return res.status(500).json({ message: "Erro interno no servidor" });
  }

  try {
    const decoded = jwt.verify(token!, secret) as { userId: string };
    req.userId = decoded.userId;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido ou expirado" });
  }
};