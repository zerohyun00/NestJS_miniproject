import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AccessTokenGuard } from 'src/auth/guard/bearer-token-guard';
import { User } from 'src/users/decorator/users.decorator';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  createOrder(
    @User('id') userId: number,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    return this.ordersService.createOrder(userId, createOrderDto);
  }

  @Get()
  @UseGuards(AccessTokenGuard)
  getUserOrders(@User('id') userId: number) {
    return this.ordersService.getOrdersByUserId(userId);
  }

  @Get(':orderId')
  getOrderDetails(@Param('orderId') orderId: number) {
    return this.ordersService.getOrderDetails(orderId);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':orderId')
  deleteOrder(@User('id') userId: number, @Param('orderId') orderId: number) {
    console.log('userId:', userId);
    console.log('orderId:', orderId);
    return this.ordersService.deleteOrder(userId, orderId);
  }
}
