import dotenv from 'dotenv';
import { createPool, Pool } from 'mysql2/promise';

dotenv.config();

// Read from environment variables (with fallback to defaults)
const DB_USERNAME = process.env.DB_USERNAME || '';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_NAME = process.env.DB_NAME || '';
const DB_HOST = process.env.DB_HOST || '';
const DB_PORT = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 11435;

const pool: Pool = createPool({
  host: DB_HOST,
  user: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool;
export type { Pool };
