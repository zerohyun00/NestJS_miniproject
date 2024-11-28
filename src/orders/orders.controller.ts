import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AccessTokenGuard } from 'src/auth/guard/bearer-token-guard';
import { User } from 'src/users/decorator/users.decorator';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary: '주문 생성',
    description: '사용자가 새로운 주문을 생성합니다.',
  })
  @ApiResponse({
    status: 201,
    description: '주문이 성공적으로 생성되었습니다.',
    schema: {
      example: {
        id: 1,
        recipient_name: '테스트 사용자',
        phone_number: '010-1234-5678',
        address: '서울특별시 강남구 테헤란로',
        total_amount: 100000,
        order_date: '2024-11-22T12:34:56Z',
        status: '결제 대기',
        user: { id: 2, email: 'user@example.com' },
        products: [
          { id: 101, name: '상품1', price: 50000 },
          { id: 102, name: '상품2', price: 50000 },
        ],
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Request에 user 프로퍼티가 존재하지 않습니다!',
    schema: {
      example: {
        message: 'Request에 user 프로퍼티가 존재하지 않습니다!',
        statusCode: 500,
      },
    },
  })
  @Post()
  @UseGuards(AccessTokenGuard)
  createOrder(
    @User('id') userId: number,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    return this.ordersService.createOrder(userId, createOrderDto);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: '사용자의 주문 목록 조회',
    description: '현재 사용자의 모든 주문 내역을 가져옵니다.',
  })
  @ApiResponse({
    status: 200,
    description: '사용자의 주문 목록이 반환됩니다.',
    schema: {
      example: [
        {
          id: 1,
          recipient_name: '테스트 사용자',
          phone_number: '010-1234-5678',
          address: '서울특별시 강남구 테헤란로',
          total_amount: 100000,
          order_date: '2024-11-22T12:34:56Z',
          status: '결제 대기',
        },
      ],
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Request에 user 프로퍼티가 존재하지 않습니다!',
    schema: {
      example: {
        message: 'Request에 user 프로퍼티가 존재하지 않습니다!',
        statusCode: 500,
      },
    },
  })
  @Get()
  @UseGuards(AccessTokenGuard)
  getUserOrders(@User('id') userId: number) {
    return this.ordersService.getOrdersByUserId(userId);
  }

  @ApiOperation({
    summary: '주문 상세 조회',
    description: '특정 주문 ID에 대한 상세 정보를 가져옵니다.',
  })
  @ApiParam({
    name: 'orderId',
    description: '조회할 주문의 ID',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: '주문 상세 정보가 반환됩니다.',
    schema: {
      example: {
        id: 1,
        recipient_name: '테스트 사용자',
        phone_number: '010-1234-5678',
        address: '서울특별시 강남구 테헤란로',
        total_amount: 100000,
        order_date: '2024-11-22T12:34:56Z',
        status: '결제 대기',
        user: { id: 2, email: 'user@example.com' },
        products: [
          { id: 101, name: '상품1', price: 50000 },
          { id: 102, name: '상품2', price: 50000 },
        ],
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Request에 user 프로퍼티가 존재하지 않습니다!',
    schema: {
      example: {
        message: 'Request에 user 프로퍼티가 존재하지 않습니다!',
        statusCode: 500,
      },
    },
  })
  @Get(':orderId')
  getOrderDetails(@Param('orderId') orderId: number) {
    return this.ordersService.getOrderDetails(orderId);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: '주문 삭제',
    description: '사용자가 본인의 특정 주문을 삭제합니다.',
  })
  @ApiParam({
    name: 'orderId',
    description: '삭제할 주문의 ID',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: '주문이 성공적으로 삭제되었습니다.',
    schema: {
      example: { message: '주문이 삭제되었습니다.' },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Request에 user 프로퍼티가 존재하지 않습니다!',
    schema: {
      example: {
        message: 'Request에 user 프로퍼티가 존재하지 않습니다!',
        statusCode: 500,
      },
    },
  })
  @UseGuards(AccessTokenGuard)
  @Delete(':orderId')
  deleteOrder(@User('id') userId: number, @Param('orderId') orderId: number) {
    return this.ordersService.deleteOrder(userId, orderId);
  }
}
