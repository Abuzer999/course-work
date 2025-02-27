import prisma from "~/lib/prisma";
import { put } from "@vercel/blob";
import type { UserSession } from "#auth-utils";
import type { IProduct } from "~/types/product";

export default defineEventHandler(async (event) => {
  try {
    const formData = await readMultipartFormData(event);

    if (!formData) {
      throw createError({
        statusCode: 400,
        message: "Form data is required.",
      });
    }

    function formDataToObject(fields: any) {
      const result: any = {};

      fields.forEach((field: any) => {
        if (field.name) {
          if (field.filename) {
            result[field.name] = {
              filename: field.filename,
              type: field.type,
              data: field.data, 
            };
          } else {
            result[field.name] = field.data.toString();
          }
        }
      });

      return result;
    }

    const formObject = formDataToObject(formData);
    const { name, description, price, stock, file } = formObject;

    console.log(name, description, price, stock, file);

    if (!name || !description || !price || !stock || !file) {
      throw createError({
        statusCode: 400,
        message: "All fields including file are required.",
      });
    }

    const session: UserSession = await getUserSession(event);

    if (!session) {
      throw createError({
        statusCode: 401,
        message: "Unauthorized",
      });
    }

    const userId = session?.user?.id;

    if (!userId) {
      throw createError({
        statusCode: 400,
        message: "User ID is required.",
      });
    }

    const blob = await put(`Products/${file.filename}`, file.data, {
      access: "public",
      contentType: file.type, 
    });

    const product: IProduct = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock),
        image: blob?.url || "",
        createdById: userId,
      },
    });

    return { product };
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Internal Server Error",
    });
  }
});