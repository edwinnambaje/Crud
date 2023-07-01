import dotenv from 'dotenv';

dotenv.config();

const MONGO_URL: string = process.env.MONGODB_URL!;
const SERVER_PORT: number = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 8080;

export const config = {
    mongo: {
        url: MONGO_URL,
    },
    server: {
        port: SERVER_PORT,
    },
};
