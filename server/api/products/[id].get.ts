import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParams(event).id;

    if (!id) {
      return { error: "Product ID is required", statusMessage: "Invalid ID" };
    }

    const product = await prisma.product.findUnique({
      where: {
        id: id,
      },
    });

    if (!product) {
      return { error: "Product not found", statusMessage: "Product not found" };
    }

    return product;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
});
