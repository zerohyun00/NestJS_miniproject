import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { OrdersModel } from './order.entity';
import { IOrdersRepository } from './order.interface';

@Injectable()
export class OrdersRepository
  extends Repository<OrdersModel>
  implements IOrdersRepository
{
  constructor(private readonly dataSource: DataSource) {
    super(OrdersModel, dataSource.createEntityManager());
  }

  async findByUserId(userId: number): Promise<OrdersModel[]> {
    return this.find({
      where: { user: { id: userId } },
      relations: ['user'],
      order: { order_date: 'DESC' },
    });
  }

  async findOrderDetails(orderId: number): Promise<OrdersModel> {
    return this.findOne({
      where: { id: orderId },
      relations: ['user'], // 유저 정보 포함
    });
  }
}
