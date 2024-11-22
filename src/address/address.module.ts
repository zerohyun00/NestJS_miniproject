import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressModel } from './entities/address.entity';
import { AddressRepository } from './entities/address.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AddressModel])],
  controllers: [AddressController],
  providers: [AddressService, AddressRepository],
  exports: [AddressRepository],
})
export class AddressModule {}
