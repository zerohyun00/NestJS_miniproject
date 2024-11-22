import { forwardRef, Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminsModel } from './entities/admin.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';
import { AdminsRepository } from './entities/admin.repository';
import { UsersRepository } from 'src/users/entities/user.repository';
import { OrdersRepository } from 'src/orders/entities/order.repository';
import { ProductsModel } from 'src/products/entities/product.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminsModel, ProductsModel]),
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [AdminsController],
  providers: [
    AdminsService,
    AdminsRepository,
    UsersRepository,
    OrdersRepository,
  ],
  exports: [AdminsService],
})
export class AdminsModule {}
