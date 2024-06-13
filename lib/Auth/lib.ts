import { SessionOptions } from "iron-session";
import { boolean } from "zod";

export interface SessionData {
    userId?: string;
    username?: string;
    image?: string;
    isLoggedIn: boolean
}

export const defaultSession: SessionData = {
    isLoggedIn: false
}

export const sessionOptions: SessionOptions = {
    password: process.env.SECRET_KEY!,
    cookieName: "admin-session",
    cookieOptions: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    }
}