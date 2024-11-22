import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { UsersModel } from './users/entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

import {
  DB_TYPE,
  ENV_DB_DATABASE_KEY,
  ENV_DB_HOST_KEY,
  ENV_DB_PASSWORD_KEY,
  ENV_DB_PORT_KEY,
  ENV_DB_USERNAME_KEY,
} from './common/const/env-keys.const';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
import { OrdersModel } from './orders/entities/order.entity';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { AdminsModule } from './admins/admins.module';
import { CategoriesModel } from './categories/entities/category.entity';
import { ProductsModel } from './products/entities/product.entity';

import { AdminsModel } from './admins/entities/admin.entity';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './admins/guard/roles.guard';
import { AccessTokenGuard } from './auth/guard/bearer-token-guard';
import { AddressModel } from './address/entities/address.entity';
import { AddressModule } from './address/address.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: DB_TYPE,
      host: process.env[ENV_DB_HOST_KEY],
      port: parseInt(process.env[ENV_DB_PORT_KEY] || '5432'),
      username: process.env[ENV_DB_USERNAME_KEY],
      password: process.env[ENV_DB_PASSWORD_KEY],
      database: process.env[ENV_DB_DATABASE_KEY],
      entities: [
        UsersModel,
        OrdersModel,
        CategoriesModel,
        ProductsModel,
        AdminsModel,
        AddressModel,
      ],
      synchronize: true,
    }),
    UsersModule,
    CommonModule,
    AuthModule,
    OrdersModule,
    ProductsModule,
    CategoriesModule,
    AdminsModule,
    AddressModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
