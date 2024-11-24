import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { RolesEnum } from 'src/common/const/roles.const';
import { Roles } from 'src/admins/decorator/roles.decorator';
import { LogInterceptor } from 'src/common/interceptor/log.interceptor';
import { AccessTokenGuard } from 'src/auth/guard/bearer-token-guard';

@ApiTags('Categories')
@ApiBearerAuth()
@Controller('admin/categories')
@UseInterceptors(LogInterceptor)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  @Roles(RolesEnum.ADMIN)
  @ApiOperation({
    summary: '카테고리 생성',
    description: '새로운 카테고리를 생성합니다. 헤더에 Bearer Token 필요',
  })
  @ApiResponse({
    status: 201,
    description: '카테고리가 성공적으로 생성되었습니다.',
  })
  @ApiResponse({ status: 403, description: '권한이 없습니다.' })
  @ApiResponse({ status: 400, description: '유효하지 않은 요청 데이터입니다.' })
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.createCategory(createCategoryDto);
  }

  @Get(':id')
  @UseGuards(AccessTokenGuard)
  @Roles(RolesEnum.ADMIN)
  @ApiOperation({
    summary: '카테고리 조회',
    description: '특정 ID의 카테고리를 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '카테고리 정보 반환.',
    schema: { example: { id: 1, name: '아우터' } },
  })
  @ApiResponse({ status: 404, description: '카테고리를 찾을 수 없습니다.' })
  async getCategoryById(@Param('id') categoryId: number) {
    return this.categoriesService.getCategoryById(categoryId);
  }

  @Get()
  @UseGuards(AccessTokenGuard)
  @Roles(RolesEnum.ADMIN)
  @ApiOperation({
    summary: '모든 카테고리 조회',
    description: '모든 카테고리를 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '카테고리 목록 반환.',
    schema: {
      example: [
        { id: 1, name: '아우터' },
        { id: 2, name: 'Books' },
      ],
    },
  })
  @ApiResponse({ status: 403, description: '권한이 없습니다.' })
  async getAllCategory() {
    return this.categoriesService.getAllCategory();
  }
}
