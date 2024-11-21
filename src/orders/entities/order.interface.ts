import { Repository } from 'typeorm';
import { OrdersModel } from './order.entity';

export interface IOrdersRepository extends Repository<OrdersModel> {
  findByUserId(userId: number): Promise<OrdersModel[]>;
}
