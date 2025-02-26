import prisma from "~/lib/prisma";
import { useBasket } from "~/composables/useBasket";

const { updateTotalAmount } = useBasket();

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    if (!body || typeof body.productId !== "string") {
      throw createError({
        statusCode: 400,
        message: "Invalid request body.",
      });
    }

    const session = await getUserSession(event);

    if (!session || !session.user?.id) {
      throw createError({
        statusCode: 401,
        message: "Unauthorized",
      });
    }

    const userId = session.user.id;

    const basket = await prisma.basket.findUnique({
      where: { userId },
      select: { id: true },
    });

    if (!basket) {
      throw createError({
        statusCode: 404,
        message: "Basket not found.",
      });
    }

    const existingBasketItem = await prisma.basketItems.findFirst({
      where: {
        cartId: basket.id,
        productId: body.productId,
      },
    });

    if (!existingBasketItem) {
      throw createError({
        statusCode: 404,
        message: "Item not found in basket.",
      });
    }

    await prisma.basketItems.delete({
      where: { id: existingBasketItem.id },
    });

    const totalAmount = await updateTotalAmount(basket.id);

    return { message: "Item removed from basket.", totalAmount };
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Failed to remove item from basket.",
    });
  }
});
