import fs from 'fs';
import path from 'path';

const sslCert: Buffer = fs.readFileSync(path.resolve(__dirname, 'aiven-ca.pem'));

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
    username: process.env.DB_USERNAME || "",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "",
    host: process.env.DB_HOST || "",
    port: parseInt(process.env.DB_PORT || "11435", 10),
    dialect: "mysql",
    dialectOptions: {
      ssl: {
        ca: sslCert,
        require: true,
        rejectUnauthorized: true
      }
    }
  },
  test: {
    username: process.env.DB_USERNAME || "",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "",
    host: process.env.DB_HOST || "",
    port: parseInt(process.env.DB_PORT || "11435", 10),
    dialect: "mysql",
    dialectOptions: {
      ssl: {
        ca: sslCert,
        require: true,
        rejectUnauthorized: true
      }
    }
  },
  production: {
    username: process.env.DB_USERNAME || "",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "",
    host: process.env.DB_HOST || "",
    port: parseInt(process.env.DB_PORT || "11435", 10),
    dialect: "mysql",
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
