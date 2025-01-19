import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";

export const registerSchema = toTypedSchema(
  z
    .object({
      name: z
        .string({
          invalid_type_error: "Please enter a valid name",
        })
        .min(1, "Name should be at least 1 character long")
        .default(""),
      email: z
        .string()
        .email("Email is not valid")
        .refine(
          (value) => {
            return /@(gmail\.com|yahoo\.com|outlook\.com|icloud\.com|hotmail\.com)$/.test(
              value
            );
          },
          {
            message: "Email is required, please enter a valid email address",
          }
        )
        .default(""),
      password: z
        .string()
        .min(8, "Password should be at least 8 characters long")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[\W_]/, "Password must contain at least one special character")
        .regex(
          /^[A-Za-z0-9\W_]+$/,
          "Password must only contain English letters, numbers, and special characters"
        )
        .default(""),
      confirmPassword: z.string().default("Passwords do not match"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    })
);
