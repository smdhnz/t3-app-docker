import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, "required"),
  password: z.string().min(1, "required"),
});

export const changePassSchema = z
  .object({
    password: z.string().min(1, "required"),
    confirmPassword: z.string().min(1, "required"),
  })
  .refine((arg) => arg.password === arg.confirmPassword, {
    message: "mismatch password",
    path: ["confirmPassword"],
  });
