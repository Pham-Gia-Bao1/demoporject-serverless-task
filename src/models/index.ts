import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';
import { Task, initTaskModel } from './task';
import dotenv from 'dotenv';
dotenv.config();

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

interface DBConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: 'mysql' | 'postgres' | 'sqlite' | 'mssql';
  [key: string]: any;
}

const config: DBConfig = require(__dirname + '/../config/config.json')[env];

const db: any = {};

let sequelize: Sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable]!, config);
} else {
  sequelize = new Sequelize(
    config.database!,
    config.username!,
    config.password,
    config
  );
}

initTaskModel(sequelize);

db.Food = Task;
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
export { sequelize, Task };
