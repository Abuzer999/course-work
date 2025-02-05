import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const id = getRouterParams(event).id;

  if (!id) {
    throw createError({
      statusCode: 400,
      message: "Product ID is required",
    });
  }

  const product = await prisma.product.findUnique({
    where: {
      id: id,
    },
  });

  if (!product) {
    throw createError({
      statusCode: 404,
      message: "Product not found",
    });
  }

  return product;
});
