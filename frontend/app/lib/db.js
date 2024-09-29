import dotenv from 'dotenv';
import pg from 'pg';
const { Pool } = pg;

dotenv.config();

export const pool = new Pool({
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
});
