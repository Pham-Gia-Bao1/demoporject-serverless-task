import dotenv from 'dotenv';
import { createPool, Pool } from 'mysql2/promise';

dotenv.config();

const pool: Pool = createPool({
  host: process.env.DB_HOST || '',
  user: process.env.DB_USER || '',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || '',
  port: Number(process.env.DB_PORT) || 11435,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool;
export type { Pool };
