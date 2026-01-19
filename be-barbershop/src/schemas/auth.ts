import * as z from "zod";

export const RegisterSchema = z.object({
  username: z.string().min(5),
  email: z.string().email(),
  password: z.string().min(8),
});

export const LoginSchema = RegisterSchema.omit({ username: true });
