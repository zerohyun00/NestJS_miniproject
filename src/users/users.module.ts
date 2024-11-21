import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModel } from './entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { AdminsModule } from 'src/admins/admins.module';
import { AddressModel } from 'src/orders/entities/adress.entity';
import { UsersRepository } from './entities/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersModel, AddressModel]),
    forwardRef(() => AuthModule),
    forwardRef(() => AdminsModule),
  ],
  exports: [UsersService, TypeOrmModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
})
export class UsersModule {}
