import prisma from "~/lib/prisma";
import { IUser } from "~/types/user";

export default defineEventHandler(
  async (event) => {
    try {
      const body = await readBody(event);

      const session = await getUserSession(event);

      if (!session || !session.user) {
        throw createError({
          statusCode: 401,
          statusMessage: "Пользователь не авторизован",
        });
      }

      const userId = session.user.;

      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        throw createError({
          statusCode: 404,
          statusMessage: "Пользователь не найден",
        });
      }

      return user;
    }catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Get profile error:", error.message);
    }
  }
);
