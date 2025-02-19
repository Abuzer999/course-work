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

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        name: true,
        email: true,
        age: true,
        gender: true,
        profilePic: true,
      },
    });

    if (!user) {
      throw createError({
        statusCode: 404,
        message: "User not found.",
      });
    }


    return user;

  } catch (error: any) {
    console.error("Ошибка получения профиля:", error);
    throw createError({
      statusCode: error.statusCode,
      message: "Не удалось получить профиль.",
    });
  }
});
