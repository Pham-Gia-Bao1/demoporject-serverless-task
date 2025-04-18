import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables from a .env file
dotenv.config();

const sslCert: Buffer = fs.readFileSync(path.resolve(__dirname, 'aiven-ca.pem'));

// Read from environment variables (with fallback to defaults)
const DB_USERNAME = process.env.DB_USERNAME || '';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_NAME = process.env.DB_NAME || '';
const DB_HOST = process.env.DB_HOST || '';
const DB_PORT = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 11435;

interface DBConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
  dialect: string;
  dialectOptions: {
    ssl: {
      ca: Buffer;
      require: boolean;
      rejectUnauthorized: boolean;
    };
  };
}

interface Config {
  development: DBConfig;
  test: DBConfig;
  production: DBConfig;
}

const config: Config = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'mysql',
    dialectOptions: {
      ssl: {
        ca: sslCert,
        require: true,
        rejectUnauthorized: true
      }
    }
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'mysql',
    dialectOptions: {
      ssl: {
        ca: sslCert,
        require: true,
        rejectUnauthorized: true
      }
    }
  },
  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'mysql',
    dialectOptions: {
      ssl: {
        ca: sslCert,
        require: true,
        rejectUnauthorized: true
      }
    }
  }
};

export default config;
