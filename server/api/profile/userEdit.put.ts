import prisma from "~/lib/prisma";
import type { UserSession } from "#auth-utils";
import type { IUser } from "~/types/user";

export default defineEventHandler(async (event) => {
  try {
    const session: UserSession = await getUserSession(event);

    if (!session?.user) {
      throw createError({
        statusCode: 401,
        message: "Unauthorized",
      });
    }

    const userId = session.user.id;

    if (!userId) {
      throw createError({
        statusCode: 400,
        message: "User ID is required.",
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { name: true, email: true, age: true },
    });

    if (!user) {
      throw createError({
        statusCode: 404,
        message: "User not found.",
      });
    }

    const body: IUser = await readBody(event);

    if (
      body.name === user.name &&
      body.email === user.email &&
      body.age === user.age
    ) {
      throw createError({ statusCode: 400, message: "No changes detected." });
    }

    if (!body.name || body.name.trim().length < 2) {
      throw createError({
        statusCode: 400,
        message: "Name must be at least 1 character long.",
      });
    }

    if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      throw createError({
        statusCode: 400,
        message: "Invalid email format.",
      });
    }

    if (!body.age || isNaN(body.age) || body.age < 10 || body.age > 100) {
      throw createError({
        statusCode: 400,
        message: "Age must be a valid positive number between 10 and 100.",
      });
    }

    const existingUserWithEmail = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (existingUserWithEmail && existingUserWithEmail.id !== userId) {
      throw createError({
        statusCode: 400,
        message: "Email is already in use.",
      });
    }


    if (
      body.name === user.name &&
      body.email === user.email &&
      body.age === user.age
    ) {
      throw createError({ statusCode: 400, message: "No changes detected." });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name: body.name ?? undefined,
        email: body.email !== user.email ? body.email : undefined,
        age: body.age ?? undefined,
      },
    });

    if (!updatedUser) {
      throw createError({
        statusCode: 404,
        message: "User not found.",
      });
    }

    return {
      updatedUser,
    };
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Internal Server Error",
    });
  }
});
