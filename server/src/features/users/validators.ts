import z from "zod";

export const registerUserSchema = z.object({
  full_name: z.string().min(4).max(50),
  email: z.string().email(),
  password: z.string().min(8).max(14),
});

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(14),
});
