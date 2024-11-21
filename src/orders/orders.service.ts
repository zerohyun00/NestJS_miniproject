import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersRepository } from './entities/order.repository';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async createOrder(userId: number, createOrderDto: CreateOrderDto) {
    const order = this.ordersRepository.create({
      ...createOrderDto,
      user: { id: userId },
    });

    return this.ordersRepository.save(order);
  }

  async getOrdersByUserId(userId: number) {
    const orders = await this.ordersRepository.findByUserId(userId);
    if (!orders.length) throw new NotFoundException('주문을 찾을 수 없습니다.');
    return orders;
  }
}
