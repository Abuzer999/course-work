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

    const products = await prisma.product.findMany({
        where: {
            createdById: userId
        },
        select: {
            id: true,
            name: true,
            description: true,
            price: true,
            stock: true,
            image: true
        }
    });
    return products;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.statusCode || "Failed to fetch products.",
    });
  }
});
