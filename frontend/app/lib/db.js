import dotenv from 'dotenv';
import pg from 'pg';
const { Client } = pg;

dotenv.config();

export const client = new Client({
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
});

await client.connect();
