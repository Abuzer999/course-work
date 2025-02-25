import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";

export const productSchema = toTypedSchema(
    z.object({
      name: z.string().min(1, 'Name is required'),
      description: z.string().min(10, 'Description must be at least 10 characters'),
      price: z.number().positive('Price must be positive'),
      stock: z.number().int().nonnegative('Stock must be a non-negative integer'),
    })
  );
