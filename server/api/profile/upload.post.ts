import { put } from "@vercel/blob";
import prisma from "~/lib/prisma";
import type { UserSession } from "#auth-utils";

export default defineEventHandler(async (event) => {
  const session: UserSession = await getUserSession(event);
  const body = await readMultipartFormData(event); // Читаем FormData

  if (!session?.user?.id) {
    throw createError({ statusCode: 400, message: "User ID is required." });
  }

  // Ищем файл в FormData
  const file = body?.find((item) => item.name === "image")?.data;

  if (!file) {
    throw createError({ statusCode: 400, message: "No file provided" });
  }

  // Преобразуем File в Buffer
  const fileName = `${Date.now()}-profile-pic.png`;

  // Загружаем файл на Vercel Blob
  const blob = await put(fileName, file, { access: "public" });

  // Сохраняем URL в базе данных
  await prisma.user.update({
    where: { id: session.user.id },
    data: { profilePic: blob.url },
  });

  return { message: "Profile picture uploaded successfully", url: blob.url };
});