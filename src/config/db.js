import { Client } from "pg";
import env from "../../env.js";

const postgresClient = new Client({
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASS,
    database: env.DB_NAME
})

const connectDB = async () => {
    try {
        await postgresClient.connect();
        console.log("Database connected", `${env.DB_USER}`);
    } catch (error) {
        console.error(`Database connection error: ${error.message}`);
        process.exit(1);
    }
};


const disconnectDB = async () => {
    await postgresClient.end();
};

export { connectDB, disconnectDB, postgresClient };
