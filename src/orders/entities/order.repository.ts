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
    return this.find({ where: { user: { id: userId } } });
  }
}
