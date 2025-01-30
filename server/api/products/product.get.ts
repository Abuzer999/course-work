import prisma from "~/lib/prisma";
import { IProduct } from "~/types/product";

export default defineEventHandler(async (event) => {
  try {

    const query = getQuery(event); // Получаем параметры из запроса, например, limit и offset

    const limit = parseInt(query.limit as string) || 10; // Количество товаров на странице, по умолчанию 10
    const offset = parseInt(query.offset as string) || 0; // Смещение (начало страницы), по умолчанию 0

    // Получаем товары с пагинацией
    const products: IProduct[] = await prisma.product.findMany({
      take: limit, 
      skip: offset, 
    });

    const totalProducts = await prisma.product.count();
    return {
      products,
      totalProducts,
      limit,
      offset,
      statusMessage: "Товары успешно загружены.",
    };
  } catch (error) {
    console.error("Ошибка получения товаров:", error);
    throw createError({
      statusCode: 500,
      message: "Не удалось получить товары.",
    });
  }
});
