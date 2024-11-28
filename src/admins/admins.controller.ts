import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsLoginDto } from './dto/login-admin.dto';
import { LogInterceptor } from 'src/common/interceptor/log.interceptor';
import { Roles } from './decorator/roles.decorator';
import { RolesEnum } from 'src/common/const/roles.const';
import { RolesGuard } from './guard/roles.guard';
import { AccessTokenGuard } from 'src/auth/guard/bearer-token-guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Admins')
@Controller('admin')
@UseInterceptors(LogInterceptor)
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @ApiOperation({
    summary: '관리자 로그인',
    description: '관리자가 이메일과 비밀번호로 로그인합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '로그인 성공. JWT 토큰이 반환됩니다.',
    schema: {
      example: {
        accessToken: 'jwt-token',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: '잘못된 관리자 계정입니다.',
    schema: {
      example: {
        message: '잘못된 관리자 계정입니다.',
        error: 'Unauthorized',
        statusCode: 401,
      },
    },
  })
  @Post('login')
  async login(@Body() adminLoginDto: AdminsLoginDto) {
    return this.adminsService.login(adminLoginDto);
  }

  @ApiOperation({
    summary: '신규 가입자 수 조회',
    description:
      '관리자가 신규 가입자 수를 조회합니다. 관리자 권한이 필요합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '신규 가입자 수가 반환됩니다.',
    schema: {
      example: {
        count: 15,
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: '토큰을 제공 해주세요!',
    schema: {
      example: {
        message: '토큰을 제공 해주세요!',
        error: 'Unauthorized',
        statusCode: 401,
      },
    },
  })
  @UseGuards(AccessTokenGuard)
  @Roles(RolesEnum.ADMIN)
  @Get('new-signups')
  getNewSignupsCount() {
    return this.adminsService.getNewSignUpsCount();
  }

  @ApiOperation({
    summary: '오늘의 주문 개수 조회',
    description: '관리자가 오늘의 주문 개수를 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '오늘의 주문 개수가 반환됩니다.',
    schema: {
      example: {
        orderCount: 30,
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: '토큰을 제공 해주세요!',
    schema: {
      example: {
        message: '토큰을 제공 해주세요!',
        error: 'Unauthorized',
        statusCode: 401,
      },
    },
  })
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Get('today-orders')
  getTodayOrderCount() {
    return this.adminsService.getTodayOrderCount();
  }

  @ApiOperation({
    summary: '가장 많이 조회된 상품 조회',
    description: '관리자가 가장 많이 조회된 상품을 확인합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '가장 많이 조회된 상품의 정보가 반환됩니다.',
    schema: {
      example: {
        productId: 101,
        name: '베스트셀러 상품',
        viewCount: 1200,
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: '토큰을 제공 해주세요!',
    schema: {
      example: {
        message: '토큰을 제공 해주세요!',
        error: 'Unauthorized',
        statusCode: 401,
      },
    },
  })
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Get('most-viewed')
  getMostViewed() {
    return this.adminsService.getMostViewed();
  }

  @ApiOperation({
    summary: '금일 매출 합계 조회',
    description: '관리자가 금일 매출 합계를 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '금일 매출 합계가 반환됩니다.',
    schema: {
      example: {
        totalSales: 1200000,
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: '토큰을 제공 해주세요!',
    schema: {
      example: {
        message: '토큰을 제공 해주세요!',
        error: 'Unauthorized',
        statusCode: 401,
      },
    },
  })
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Get('today-total')
  getTodaySalesTotal() {
    return this.adminsService.getTodaySalesTotal();
  }
}
