import { put, del } from "@vercel/blob";  
import prisma from "~/lib/prisma";
import type { UserSession } from "#auth-utils";

export default defineEventHandler(async (event) => {
  try {
    const session: UserSession = await getUserSession(event);
    const userId = session?.user?.id;

    if (!userId) {
      throw createError({
        statusCode: 400,
        message: "User ID is required.",
      });
    }

    const formData = await readMultipartFormData(event);
    const file = formData?.find((field) => field.name === "file");

    if (!file) {
      throw createError({
        statusCode: 400,
        message: "File is required.",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        profilePic: true,  
      },
    });

    if (user?.profilePic) {
      try {
        await del(user.profilePic); 
      } catch (deleteError) {
        console.error("Error deleting previous profile image:", deleteError);
      }
    }

    const blob = await put(`ProfileImage/${file.filename}`, file.data, {
      access: "public",
    });

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        profilePic: blob.url,
      },
    });

    return {
      url: blob.url,
    };
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "An error occurred.",
    });
  }
});