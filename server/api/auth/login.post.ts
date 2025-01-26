import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);

        if (!body || typeof body.email !== 'string' || typeof body.password !== 'string') {
            throw createError({
                statusCode: 400,
                message: 'Invalid request body.',
            });
        }

        const { email, password } = body;

        const user = await prisma.user.findUnique({
            where: { email },
            select: { id: true, password: true },
        });

        if (!user) {
            await new Promise((resolve) => setTimeout(resolve, 500)); // Задержка для защиты от brute force
            throw createError({
                statusCode: 401,
                message: 'Invalid email or password.',
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            await new Promise((resolve) => setTimeout(resolve, 500)); // Задержка
            throw createError({
                statusCode: 401,
                message: 'Invalid email or password.',
            });
        }

        const token = jwt.sign(
            { id: user.id, role: user.role, email: user.email }, 
            useRuntimeConfig().JWT_SECRET, 
            { expiresIn: '30d' }
        );

        event.node.res.setHeader('Set-Cookie', `auth_token=${token}; HttpOnly; Secure; Path=/; Max-Age=30 * 24 * 60 * 60`);

        return {
            statusMessage: 'Login successful!',
        };
    } catch (error: any) {
        console.error('Login error:', error);
        throw createError({
            statusCode: error.statusCode || 500,
            message: error.message || 'An error occurred.',
        });
    }
});