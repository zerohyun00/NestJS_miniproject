import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RolesEnum } from 'src/common/const/roles.const';
import { Roles } from 'src/admins/decorator/roles.decorator';
import { AccessTokenGuard } from 'src/auth/guard/bearer-token-guard';
import { LogInterceptor } from 'src/common/interceptor/log.interceptor';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { UsersModel } from './entities/user.entity';

@ApiTags('Users')
@ApiBearerAuth() // 헤더에서 토큰을 요구함
@UseInterceptors(LogInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: '모든 사용자 조회',
    description: '모든 사용자 정보를 가져옵니다. 관리자만 접근할 수 있습니다.',
  })
  @ApiResponse({
    status: 200,
    description: '사용자 조회 성공',
    type: [UsersModel], // 응답 타입 설정
  })
  @ApiResponse({
    status: 403,
    description: '권한이 없습니다.',
  })
  @ApiResponse({
    status: 401,
    description: '토큰이 유효하지 않거나 누락되었습니다.',
  })
  @Get()
  @UseGuards(AccessTokenGuard)
  @Roles(RolesEnum.ADMIN)
  getUsers() {
    return this.usersService.getAllUsers();
  }
}
