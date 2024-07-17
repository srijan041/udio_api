import dotenv from 'dotenv';

dotenv.config({
    path: "./env",
})


export const TOKEN_1_NAME = "sb-ssr-production-auth-token.1";
export const TOKEN_0_NAME = "sb-ssr-production-auth-token.0";

export const TOKEN_0 = process.env.TOKEN_0
export const TOKEN_1 = process.env.TOKEN_1

export const BASE_URL = process.env.BASE_URL
export const BASE_URL_API = process.env.BASE_URL_API
export const PORT = process.env.PORT

export const COOKIE=process.env.COOKIE