import { z } from "zod";

export const registerSchema = z.object({
  email: z
    .string({ message: "O e-mail é obrigatório" })
    .email("Formato de e-mail inválido"),
  password: z
    .string({ message: "A senha é obrigatória" })
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    /*
    .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
    .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
    .regex(/[0-9]/, "A senha deve conter pelo menos um número")
    .regex(/[^A-Za-z0-9]/, "A senha deve conter pelo menos um caractere especial")*/,
});

export const loginSchema = z.object({
  email: z
    .string({ message: "O e-mail é obrigatório" })
    .email("Formato de e-mail inválido"),
  password: z
    .string({ message: "A senha é obrigatória" }),
});