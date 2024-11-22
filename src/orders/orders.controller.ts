import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AccessTokenGuard } from 'src/auth/guard/bearer-token-guard';
import { User } from 'src/users/decorator/users.decorator';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  /**
   * 주문 생성
   * @param userId - 유저 ID
   * @param createOrderDto - 주문 생성 DTO
   */
  @Post()
  @UseGuards(AccessTokenGuard)
  createOrder(
    @User('id') userId: number,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    return this.ordersService.createOrder(userId, createOrderDto);
  }

  /**
   * 특정 유저의 주문 목록 가져오기
   * @param userId - 유저 ID
   */
  @Get()
  @UseGuards(AccessTokenGuard)
  getUserOrders(@User('id') userId: number) {
    return this.ordersService.getOrdersByUserId(userId);
  }

  /**
   * 주문 상세 정보 조회
   * @param orderId - 주문 ID
   */
  @Get(':orderId')
  getOrderDetails(@Param('orderId') orderId: number) {
    return this.ordersService.getOrderDetails(orderId);
  }
}
