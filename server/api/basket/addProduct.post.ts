import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  try {
    const session = await getUserSession(event);

    if (!session) {
      throw createError({
        statusCode: 401,
        message: "Unauthorized",
      });
    }

    

  } catch (error: unknown) {
    
  }
});