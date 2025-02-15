import { put } from "@vercel/blob";

export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event);

  if (!formData || formData.length === 0) {
    throw createError({
      statusCode: 400,
      message: "No file uploaded",
    });
  }

  const file = formData[0];

  try {
    const blob = await put(file.filename || "unknown", file.data, {
      access: "public",
    });

    return {
      success: true,
      url:blob.url,
      downloadUrl: blob.downloadUrl,
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: "Upload failed",
      data: error instanceof Error ? error.message : String(error),
    });
  }
});
