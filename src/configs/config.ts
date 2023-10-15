import {config} from "dotenv"
config()
export const configs = {
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL,
    ROUND_HASH: process.env.ROUND_HASH,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    ADMIN_LOGIN: process.env.ADMIN_LOGIN,
    ADMIN_PASS: process.env.ADMIN_PASS,
    AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
    AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
    AWS_S3_REGION: process.env.AWS_S3_REGION,
    AWS_S3_NAME: process.env.AWS_S3_NAME,
    AWS_S3_ACL: process.env.AWS_S3_ACL,
    AWS_S3_URL: process.env.AWS_S3_URL
}