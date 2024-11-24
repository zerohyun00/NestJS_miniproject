import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
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

@ApiTags('Users')
@ApiBearerAuth()
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
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
            example: 1,
            description: '사용자 ID',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2024-11-16T04:08:32.919Z',
            description: '사용자 생성 날짜',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            example: '2024-11-16T04:08:32.919Z',
            description: '사용자 업데이트 날짜',
          },
          email: {
            type: 'string',
            example: 'kyhh39@naver.com',
            description: '사용자 이메일',
          },
          gender: {
            type: 'string',
            example: '남자',
            description: '사용자 성별',
          },
          mobile_number: {
            type: 'string',
            example: '01092170299',
            description: '사용자 휴대폰 번호',
          },
          role: {
            type: 'string',
            example: 'USER',
            description: '사용자 권한',
          },
        },
      },
    },
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
