import bcrypt from 'bcrypt';
import prisma from '~/lib/prisma';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event); // Получаем данные из тела запроса
    const { name, email, password } = body;

    if (!name || !email || !password) {
      throw createError({
        statusCode: 400,
        message: 'Name, email, and password are required.',
      });
    }

    // Проверяем, существует ли пользователь
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw createError({
        statusCode: 400,
        message: 'User with this email already exists.',
      });
    }

    // Хэшируем пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создаем пользователя
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return {
      message: 'User registered successfully!',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      }, // Возвращаем только безопасные данные
    };
  } catch (error: any) {
    return {
      statusCode: error.statusCode || 500,
      message: error.message || 'An error occurred.',
    };
  }
});