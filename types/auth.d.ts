declare module '#auth-utils' {

    interface User {
        id: string;
        role: string;
        email: string;
    }

    interface UserSession {
        user: User | null;
    }
}

export { UserSession }