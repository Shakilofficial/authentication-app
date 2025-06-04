import { z } from "zod";

export const signUpSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    ),
  shopNames: z
    .array(z.string().min(1, "Shop name cannot be empty"))
    .min(3, "At least 3 shop names are required")
    .max(4, "Maximum 4 shop names allowed"),
});

export const signInSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean().optional(),
});
