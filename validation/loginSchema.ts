import { z } from "zod";
import { toTypedSchema } from '@vee-validate/zod';

export const loginSchema = toTypedSchema(
  z.object({
    email: z
      .string()
      .email("Please enter a valid email address.")
      .min(1, "Email is required.")
      .default(""),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters long.")
      .default(""),
  })
);