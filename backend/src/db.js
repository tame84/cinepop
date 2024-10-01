import dotenv from 'dotenv';
import pg from 'pg';
const { Client } = pg;

dotenv.config();

export const client = new Client({
    user: process.env.POSTGRE_USER,
    password: process.env.POSTGRE_PASSWORD,
    host: process.env.POSTGREHOST,
    port: process.env.POSTGRE_PORT,
    database: process.env.POSTGRE_DATABASE,
});
