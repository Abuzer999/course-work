import prisma from "~/lib/prisma";
import type { UserSession } from "#auth-utils";
import { BasketItem } from "~/types/basket";
import { useBasket } from "~/composables/useBasket";

const { updateTotalAmount } = useBasket(); 

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
      where: { userId },
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

    const items: BasketItem[] = basket.items.map((item) => ({
      productId: item.product.id,
      name: item.product.name,
      image: item.product.image,
      price: item.product.price,
      description: item.product.description,
      quantity: item.quantity,
      totalPrice: item.quantity * item.product.price,
    }));

    const totalAmount = await updateTotalAmount(basket.id);

    return { totalAmount, items };
  } catch (error: any) {
    console.error("Ошибка получения товаров:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Не удалось получить товары.",
    });
  }
});