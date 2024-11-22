import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { AddressModel } from './address.entity';

@Injectable()
export class AddressRepository extends Repository<AddressModel> {
  constructor(private readonly dataSource: DataSource) {
    super(AddressModel, dataSource.createEntityManager());
  }

  /**
   * 특정 사용자의 주소를 조회
   * @param userId - 사용자 ID
   */
  async findByUserId(userId: number): Promise<AddressModel[]> {
    return this.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * 주소 ID와 사용자 ID를 기반으로 주소를 조회
   * @param addressId - 주소 ID
   * @param userId - 사용자 ID
   */
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
