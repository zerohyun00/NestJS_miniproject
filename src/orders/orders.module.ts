import { Module, forwardRef } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModel } from './entities/order.entity';
import { UsersModule } from '../users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { AdminsModule } from 'src/admins/admins.module';
import { AddressModel } from '../address/entities/address.entity';
import { ProductsModule } from 'src/products/products.module';
import { ProductsModel } from 'src/products/entities/product.entity';
import { OrdersRepository } from './entities/order.repository';
import { AddressModule } from 'src/address/address.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrdersModel, AddressModel, ProductsModel]),
    forwardRef(() => UsersModule),
    AuthModule,
    AdminsModule,
    AddressModule,
    forwardRef(() => ProductsModule),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
})
export class OrdersModule {}
