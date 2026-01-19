import * as z from "zod";

export const UserSchema = z.object({
  username: z.string().min(5),
  email: z.string().email(),
  password: z.string().min(8),
  roleId: z.string(),
});

export const UserUpdateSchema = UserSchema.omit({ password: true }).partial();
