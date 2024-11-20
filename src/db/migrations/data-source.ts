import * as dotenv from 'dotenv';
import {
  DB_TYPE,
  ENV_DB_DATABASE_KEY,
  ENV_DB_HOST_KEY,
  ENV_DB_PASSWORD_KEY,
  ENV_DB_PORT_KEY,
  ENV_DB_USERNAME_KEY,
} from 'src/common/const/env-keys.const';
import { DataSource } from 'typeorm';

dotenv.config();

export default new DataSource({
  type: DB_TYPE,
  host: process.env[ENV_DB_HOST_KEY],
  port: parseInt(process.env[ENV_DB_PORT_KEY] || '5432'),
  username: process.env[ENV_DB_USERNAME_KEY],
  password: process.env[ENV_DB_PASSWORD_KEY],
  database: process.env[ENV_DB_DATABASE_KEY],
  synchronize: false,
  logging: false,
  entities: ['dist/**.*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
});
