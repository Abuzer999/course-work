import prisma from "~/lib/prisma";

export const useBasket = () => {
  const updateTotalAmount = async (basketId: string) => {
    const basketItems = await prisma.basketItems.findMany({
      where: { cartId: basketId },
      include: { product: true },
    });

    const totalAmount = basketItems.reduce(
      (sum, item) => sum + item.quantity * item.product.price,
      0
    );

    await prisma.basket.update({
      where: { id: basketId },
      data: { totalAmount },
    });

    return totalAmount;
  };

  return { updateTotalAmount };
};
