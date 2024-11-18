import { DataSource } from 'typeorm';
import { UsersModel } from '../users/entities/user.entity';
import { OrdersModel } from '../orders/entities/order.entity';
import { CategoriesModel } from '../categories/entities/category.entity';
import { ProductsModel } from '../products/entities/product.entity';

import { AdminsModel } from '../admins/entities/admin.entity';
import * as dotenv from 'dotenv';
import {
  ENV_DB_DATABASE_KEY,
  ENV_DB_HOST_KEY,
  ENV_DB_PASSWORD_KEY,
  ENV_DB_PORT_KEY,
  ENV_DB_USERNAME_KEY,
} from 'src/common/const/env-keys.const';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env[ENV_DB_HOST_KEY],
  port: parseInt(process.env[ENV_DB_PORT_KEY]),
  username: process.env[ENV_DB_USERNAME_KEY],
  password: process.env[ENV_DB_PASSWORD_KEY],
  database: process.env[ENV_DB_DATABASE_KEY],
  entities: [
    UsersModel,
    OrdersModel,
    CategoriesModel,
    ProductsModel,
    AdminsModel,
  ],
  migrations: ['src/db/migrations/*.ts'],
  synchronize: true,
});
