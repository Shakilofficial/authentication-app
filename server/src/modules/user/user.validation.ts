import { z } from 'zod';

export const signUp = z.object({
  body: z.object({
    username: z.string().min(3),
    password: z
      .string()
      .min(8)
      .regex(/[0-9]/, 'Must contain at least one number')
      .regex(/[!@#$%^&*]/, 'Must contain at least one special character'),
    shopNames: z
      .array(z.string().min(1))
      .min(3, 'At least 3 shops required')
      .max(4, 'Maximum 4 shops allowed'),
  }),
});

export const signIn = z.object({
  body: z.object({
    username: z.string(),
    password: z.string(),
    rememberMe: z.boolean().optional(),
  }),
});

export const userValidations = { signUp, signIn };
