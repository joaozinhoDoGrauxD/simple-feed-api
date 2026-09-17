import { z } from "zod";

export const registerSchema = z.object({
  username:z 
    .string()
    .min(6, {error: "O username deve ter ao menos 6 caracteres"})
    .nonempty({error: "O username deve ser obrigatório"}),
  email: z
    .email("Formato de e-mail inválido"),
  password: z
    .string()
    .min(6, { error: "A senha deve ter ao menos 6 caracteres" })
    .nonempty({ error: "A senha deve ser obrigatória" })

});

export const loginSchema = z.object({
  email: z
    .email("Formato de e-mail inválido"),
  password: z
    .string()
    .min(6, { error: "A senha deve ter ao menos 6 caracteres" })
    .nonempty({ error: "A  senha deve ser obrigatória" })
});

export const googleAuthSchema = z.object({
  idToken: z.string({ error: "O idToken é obrigatório" }),
});