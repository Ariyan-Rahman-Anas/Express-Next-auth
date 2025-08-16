import dotenv from "dotenv"
dotenv.config()

interface EnvConfigI {
    PORT: string
    DB_URI: string
    OTP: string
    ACCESS_TOKEN_SECRET: string,
    ACCESS_TOKEN_EXPIRY: string
    REFRESH_TOKEN_SECRET: string
    REFRESH_TOKEN_EXPIRY: string
}

const loadEnvVariables = (): EnvConfigI => {
    const requiredEnvVariables: string[] = [
        "PORT",
        "DB_URI",
        "OTP",
        "ACCESS_TOKEN_SECRET",
        "ACCESS_TOKEN_EXPIRY",
        "REFRESH_TOKEN_SECRET",
        "REFRESH_TOKEN_EXPIRY",

    ]
    requiredEnvVariables.forEach(key => {
        if (!process.env[key]) {
            throw new Error(`Missing required env variable: ${key}`)
        }
    })
    return {
        PORT: process.env.PORT as string,
        DB_URI: process.env.DB_URI as string,
        OTP: process.env.OTP as string,
        ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET as string,
        ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY as string,
        REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET as string,
        REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY as string,
    }
}

export const enVariables = loadEnvVariables()