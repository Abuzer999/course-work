// import prisma from "~/lib/prisma";
// import { put } from "@vercel/blob";
// import type { UserSession } from "#auth-utils";
// import type { IProduct } from "~/types/product";

// export default defineEventHandler(async (event) => {
//   try {
//     const formData = await readMultipartFormData(event);

//     if (!formData) {
//       throw createError({
//         statusCode: 400,
//         message: "Form data is required.",
//       });
//     }

//     const name = formData.find((field) => field.name === "name");
//     const file = formData.find((field) => field.name === "file");
//     const description = formData.find(
//       (field) => field.name === "description"
//     );
//     const price = formData.find((field) => field.name === "price");
//     const stock = formData.find((field) => field.name === "stock");

//     if (!name || !file || !description) {
//       throw createError({
//         statusCode: 400,
//         message: "Missing required fields or file.",
//       });
//     }

//     const session: UserSession = await getUserSession(event);

//     if (!session) {
//       throw createError({
//         statusCode: 401,
//         message: "Unauthorized",
//       });
//     }

//     const userId = session?.user?.id;

//     if (!userId) {
//       throw createError({
//         statusCode: 400,
//         message: "User ID is required.",
//       });
//     }

//     const blob = await put(`Products/${file.name}`, file.data, {
//       access: "public",
//     });

//     const product: IProduct = await prisma.product.create({
//       data: {
//         name,
//         description,
//         price,
//         stock,
//         image: blob?.url || "",
//         createdById: userId,
//       },
//     });

//     return {
//       product,
//     };
//   } catch (error: any) {
//     throw createError({
//       statusCode: error.statusCode || 500,
//       message: error.message || "Internal Server Error",
//     });
//   }
// });
