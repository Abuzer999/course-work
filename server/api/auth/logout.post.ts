export default defineEventHandler(async (event) => {
    try {
      event.node.res.setHeader('Set-Cookie', 'auth_token=; Max-Age=0; Path=/; HttpOnly; Secure');
      return { message: 'Logged out successfully!' };
    } catch (error: any) {
      throw createError({
        statusCode: error.statusCode || 500,
        message: error.message || 'An error occurred.',
      });
    }
  });