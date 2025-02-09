import prisma from "~/lib/prisma";
import type { UserSession } from "#auth-utils";
import type { IUser } from "~/types/user";

export default defineEventHandler(async (event) => {
  try {
    // Получаем сессию пользователя
    const session: UserSession = await getUserSession(event);

    // Если сессии нет, выбрасываем ошибку
    if (!session?.user) {
      throw createError({
        statusCode: 401,
        message: "Unauthorized",
      });
    }

    const userId = session.user.id;

    // Если ID пользователя нет, выбрасываем ошибку
    if (!userId) {
      throw createError({
        statusCode: 400,
        message: "User ID is required.",
      });
    }

    // Получаем данные пользователя
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { name: true, email: true, age: true, gender: true },
    });

    // Если пользователь не найден, выбрасываем ошибку
    if (!user) {
      throw createError({
        statusCode: 404,
        message: "User not found.",
      });
    }

    // Извлекаем данные из тела запроса для редактирования
    const body: IUser = await readBody(event); // Получаем данные, которые хотим обновить

    // Здесь можно сделать проверку, чтобы обновить только те поля, которые переданы в запросе
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      select: { name: true, email: true, age: true, gender: true, updatedAt: true },
      data: {
        // Обновляем только те поля, которые переданы в запросе
        name: body.name || user.name,
        email: body.email || user.email,
        age: body.age || user.age,
        gender: body.gender || user.gender,
      },
    });

    // Возвращаем обновленные данные пользователя
    return updatedUser;

  } catch (error: any) {
    console.error("Ошибка обновления профиля:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: "Не удалось обновить профиль.",
    });
  }
});