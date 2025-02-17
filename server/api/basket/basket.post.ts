import prisma from "~/lib/prisma";
import type { UserSession } from "#auth-utils";

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
      select: { id: true, items: true },
    });

    if (!basket) {
      throw createError({
        statusCode: 404,
        message: "Basket not found.",
      });
    }

    const body = await readBody(event);

    if (
      !body ||
      typeof body.productId !== "string" ||
      typeof body.quantity !== "number"
    ) {
      throw createError({
        statusCode: 400,
        message: "Invalid request body.",
      });
    }

    const product = await prisma.product.findUnique({
      where: { id: body.productId },
      select: {
        name: true,
        price: true,
      },
    });

    if (!product) {
      throw createError({
        statusCode: 404,
        message: "Product not found.",
      });
    }

    // Проверка, существует ли уже товар в корзине
    const existingBasketItem = await prisma.basketItems.findFirst({
      where: {
        cartId: basket.id,
        productId: body.productId,
      },
    });

    if (existingBasketItem) {
      const newQuantity = existingBasketItem.quantity + body.quantity;

      if (newQuantity < 1) {
        // Удалить товар из корзины, если количество меньше 1
        await prisma.basketItems.delete({
          where: { id: existingBasketItem.id },
        });
        return { message: "Item removed from basket." };
      } else {
        // Обновить количество товара, если оно больше или равно 1
        const updatedBasketItem = await prisma.basketItems.update({
          where: { id: existingBasketItem.id },
          data: {
            quantity: newQuantity, // Обновить количество
          },
        });
        return updatedBasketItem;
      }
    } else {
      // Если товара нет в корзине, добавляем новый элемент
      const basketItem = await prisma.basketItems.create({
        data: {
          productId: body.productId,
          quantity: body.quantity,
          cartId: basket.id, // Привязка к корзине
        },
      });

      return basketItem;
    }
  } catch (error: unknown) {
    console.error("Error adding item to basket:", error);

    throw createError({
      statusCode: 500,
      message: "Failed to add item to basket.",
    });
  }
});
