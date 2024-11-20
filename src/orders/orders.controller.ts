import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AccessTokenGuard } from 'src/auth/guard/bearer-token-guard';
import { LogInterceptor } from 'src/common/interceptor/log.interceptor';
import { User } from 'src/users/decorator/users.decorator';
import { UsersModel } from 'src/users/entities/user.entity';
import { Roles } from 'src/admins/decorator/roles.decorator';
import { RolesEnum } from 'src/common/const/roles.const';

@Controller('orders')
@UseInterceptors(LogInterceptor)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  @Roles(RolesEnum.USER)
  createOrder(
    @User('id') userId: number,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    return this.ordersService.createOrder(userId, createOrderDto);
  }
}
