import type { Request, Response, NextFunction } from "express";
import { ZodError, ZodType } from "zod";

export const validateSchema = (schema: ZodType) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.parseAsync(req.body);
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Erro de validação",
          errors: error.issues.map((err) => ({
            field: err.path.join("."),
            message: err.message
          })),
        });
      }
      return res.status(500).json({ message: "Erro interno no servidor" });
    }
  };
};