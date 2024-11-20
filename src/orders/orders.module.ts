import { Module, forwardRef } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModel } from './entities/order.entity';
import { UsersModule } from '../users/users.module'; // UsersModule 추가
import { AuthModule } from 'src/auth/auth.module';
import { AdminsModule } from 'src/admins/admins.module';
import { AddressModel } from './entities/adress.entity';
import { ProductsModule } from 'src/products/products.module';
import { ProductsModel } from 'src/products/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrdersModel, AddressModel, ProductsModel]),
    forwardRef(() => UsersModule),
    AuthModule,
    AdminsModule,
    forwardRef(() => ProductsModule),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
