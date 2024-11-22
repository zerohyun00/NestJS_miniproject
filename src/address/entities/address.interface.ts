import { Repository } from 'typeorm';
import { AddressModel } from './address.entity';

export interface IAddressRepository extends Repository<AddressModel> {
  findByUserId(userId: number): Promise<AddressModel[]>;
}
