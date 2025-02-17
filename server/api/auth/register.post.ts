import bcrypt from "bcrypt";
import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  try {
    const { name, email, password } = await readBody(event);

    if (!name || !email || !password) {
      throw createError({
        statusCode: 400,
        statusMessage: "Name, email, and password are required.",
      });
    }

    // Проверяем, существует ли пользователь
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw createError({
        statusCode: 400,
        statusMessage: "User with this email already exists.",
      });
    }

    // Хэшируем пароль
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Создаем пользователя
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const basket = await prisma.basket.create({
      data: {
        userId: user.id,
      },
    });

    return {
      message: "User registered successfully!",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      basket: {
        id: basket.id,
        userId: basket.userId,
        items: [],
      },
    };
  } catch (error: any) {
    // Явно выбрасываем ошибку
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "Internal Server Error",
    });
  }
});
