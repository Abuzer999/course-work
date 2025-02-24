import prisma from "~/lib/prisma";
import type { UserSession } from "#auth-utils";
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

    let updatedBasketItem;

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

        // Обновить `totalAmount` после удаления товара
        await updateTotalAmount(basket.id);

        return { message: "Item removed from basket." };
      } else {
        // Обновить количество товара, если оно больше или равно 1
        updatedBasketItem = await prisma.basketItems.update({
          where: { id: existingBasketItem.id },
          data: { quantity: newQuantity, totalPrice: newQuantity * product.price },
        });
      }
    } else {
      // Если товара нет в корзине, добавляем новый элемент
      updatedBasketItem = await prisma.basketItems.create({
        data: {
          productId: body.productId,
          quantity: body.quantity,
          cartId: basket.id, // Привязка к корзине
          totalPrice: body.quantity * product.price,
        },
      });
    }

    const totalAmount = await updateTotalAmount(basket.id);

    return { updatedBasketItem, totalAmount };
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Failed to add item to basket.",
    });
  }
});
