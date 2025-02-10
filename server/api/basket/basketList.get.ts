import prisma from "~/lib/prisma";
import type { UserSession } from "#auth-utils";
import { basketItem } from "~/types/basket";

export default defineEventHandler(async (event) => {
  try {
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

    const basket = await prisma.basket.findUnique({
      where: { userId: userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!basket) {
      throw createError({
        statusCode: 404,
        message: "Корзина не найдена.",
      });
    }

    const items: basketItem[] = basket.items.map((item) => ({
      productId: item.product.id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      totalPrice: item.quantity * item.product.price
    }));

    const totalAmount = items.reduce((sum, item) => sum + item.totalPrice, 0);

    return {totalAmount, items};
  } catch (error: any) {
    console.error("Ошибка получения товаров:", error);
    throw createError({
      statusCode: 500,
      message: "Не удалось получить товары.",
    });
  }
});
