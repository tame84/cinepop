import dotenv from 'dotenv';
import pg from 'pg';
const { Pool } = pg;

dotenv.config();

export const pool = new Pool({
    user: process.env.POSTGRE_USER,
    password: process.env.POSTGRE_PASSWORD,
    host: process.env.POSTGREHOST,
    port: process.env.POSTGRE_PORT,
    database: process.env.POSTGRE_DATABASE,
});
