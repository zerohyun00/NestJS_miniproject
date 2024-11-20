import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersModel } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { OrdersModel, OrderStatus } from './entities/order.entity';
import { ProductsModel } from 'src/products/entities/product.entity';
import { AddressModel } from './entities/adress.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(UsersModel)
    private readonly usersRepository: Repository<UsersModel>,
    @InjectRepository(OrdersModel)
    private readonly ordersRepository: Repository<OrdersModel>,
    @InjectRepository(ProductsModel)
    private readonly productsRepository: Repository<ProductsModel>,
    @InjectRepository(AddressModel)
    private readonly addressRepository: Repository<AddressModel>,
  ) {}

  async createOrder(userId: number, createOrderDto: CreateOrderDto) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['addresses'],
    });
    if (!user) throw new NotFoundException('사용자를 찾을 수 없습니다.');

    const {
      recipient_name,
      phone_number,
      address_id,
      new_address_name,
      new_address,
      product_details,
    } = createOrderDto;

    return this.ordersRepository;
  }
}
