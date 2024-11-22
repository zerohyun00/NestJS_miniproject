import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersRepository } from './entities/order.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsModel } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';
import { AddressRepository } from 'src/address/entities/address.repository';
import { OrderStatus } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly addressRepository: AddressRepository,
    @InjectRepository(ProductsModel)
    private readonly productsRepository: Repository<ProductsModel>,
  ) {}

  async createOrder(userId: number, createOrderDto: CreateOrderDto) {
    const {
      address_id,
      new_address,
      product_details,
      recipient_name,
      phone_number,
    } = createOrderDto;

    // 주소 처리
    const address = await this.resolveAddress(userId, address_id, new_address);

    // 상품 검증 및 총 금액 계산
    const totalAmount = await this.calculateTotalAmount(product_details);

    // 주문 생성 및 저장
    const order = this.ordersRepository.create({
      user: { id: userId },
      recipient_name,
      phone_number,
      address: address?.address,
      total_amount: totalAmount,
      order_date: new Date(),
      status: OrderStatus.PENDING,
    });

    return this.ordersRepository.save(order);
  }

  private async resolveAddress(
    userId: number,
    address_id?: number,
    new_address?: string,
  ) {
    if (address_id && new_address) {
      throw new BadRequestException(
        '기존 주소를 선택하거나 신규 주소를 입력해주세요. 두 옵션을 동시에 입력할 수 없습니다.',
      );
    }

    if (address_id) {
      const address = await this.addressRepository.findByIdAndUserId(
        address_id,
        userId,
      );
      if (!address) {
        throw new NotFoundException('주소를 찾을 수 없습니다.');
      }
      return address;
    }

    if (new_address) {
      return this.addressRepository.save({
        user: { id: userId },
        address: new_address,
        address_name: '신규 주소',
      });
    }

    throw new BadRequestException(
      '주소를 선택하거나 신규 주소를 입력해주세요!',
    );
  }

  private async calculateTotalAmount(
    product_details: { product_id: number; quantity: number }[],
  ): Promise<number> {
    const productIds = product_details.map((detail) => detail.product_id);

    const products = await this.productsRepository
      .createQueryBuilder('product')
      .where('product.id IN (:...productIds)', { productIds })
      .select(['product.id', 'product.price'])
      .getMany();

    if (products.length !== productIds.length) {
      throw new NotFoundException('상품 중 일부가 존재하지 않습니다.');
    }

    return product_details.reduce((sum, detail) => {
      const product = products.find((p) => p.id === detail.product_id);
      if (!product) {
        throw new NotFoundException(
          `상품 ID ${detail.product_id}가 존재하지 않습니다.`,
        );
      }
      return sum + product.price * detail.quantity;
    }, 0);
  }

  async getOrdersByUserId(userId: number) {
    const orders = await this.ordersRepository.findByUserId(userId);
    if (!orders.length) {
      throw new NotFoundException('주문을 찾을 수 없습니다.');
    }
    return orders;
  }

  async getOrderDetails(orderId: number) {
    const order = await this.ordersRepository.findOrderDetails(orderId);
    if (!order) {
      throw new NotFoundException('주문을 찾을 수 없습니다.');
    }
    return order;
  }

  async getAllOrders() {
    return this.ordersRepository.find({
      relations: ['user'],
      order: { order_date: 'DESC' },
    });
  }

  async deleteOrder(userId: number, orderId: number) {
    const order = await this.ordersRepository.findOne({
      where: { id: orderId },
      relations: ['user'],
    });

    if (!order) {
      throw new NotFoundException('삭제하려는 주문이 존재하지 않습니다.');
    }

    if (order.user.id !== userId) {
      throw new ForbiddenException('본인이 주문한 내역만 삭제할 수 있습니다.');
    }

    await this.ordersRepository.remove(order);
    return { message: '주문이 성공적으로 삭제되었습니다.' };
  }
}
