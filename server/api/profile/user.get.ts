// import prisma from "~/lib/prisma";
// import { IUser } from "~/types/user";

// export default defineEventHandler(
//   async (event) => {
//     try {
//       const body = await readBody(event);

//       const session = await getUserSession(event);

//       if (!session || !session.user) {
//         throw createError({
//           statusCode: 401,
//           message: "Пользователь не авторизован",
//         });
//       }

//       const userId = session.user.id;
//     }
//   }
// );
