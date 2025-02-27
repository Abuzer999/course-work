import prisma from "~/lib/prisma";
import { del } from "@vercel/blob";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    if (!body || typeof body.productId !== "string") {
      throw createError({
        statusCode: 400,
        message: "Invalid request body.",
      });
    }

    const product = await prisma.product.findUnique({
      where: { id: body.productId },
      select: { image: true }, 
    });

    if (!product) {
      throw createError({
        statusCode: 404,
        message: "Product not found.",
      });
    }

    // Удаляем товар из базы данных
    await prisma.product.delete({
      where: { id: body.productId },
    });

    // Удаляем изображение из blob storage, если оно есть
    if (product.image) {
      await del(product.image);
    }

    return { message: "Product deleted successfully" };
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Internal Server Error",
    });
  }
});
