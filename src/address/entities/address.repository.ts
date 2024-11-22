import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { AddressModel } from './address.entity';

@Injectable()
export class AddressRepository extends Repository<AddressModel> {
  constructor(private readonly dataSource: DataSource) {
    super(AddressModel, dataSource.createEntityManager());
  }

  async findByUserId(userId: number): Promise<AddressModel[]> {
    return this.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  async findByIdAndUserId(
    addressId: number,
    userId: number,
  ): Promise<AddressModel | null> {
    return this.createQueryBuilder('address')
      .where('address.id = :addressId', { addressId })
      .andWhere('address.userId = :userId', { userId })
      .getOne();
  }
}
