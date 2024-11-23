import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { RolesEnum } from 'src/common/const/roles.const';
import { Roles } from 'src/admins/decorator/roles.decorator';
import { AccessTokenGuard } from 'src/auth/guard/bearer-token-guard';
import { PaginateProductsDto } from './dto/paginate-products.dto';
import { LogInterceptor } from 'src/common/interceptor/log.interceptor';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiQuery,
  ApiConsumes,
} from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
@UseInterceptors(LogInterceptor)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary: '상품 업로드',
    description: '새로운 상품을 업로드합니다. 관리자만 접근할 수 있습니다.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '상품 업로드 데이터',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: '상품명' },
        description: { type: 'string', example: '상품 설명' },
        price: { type: 'number', example: 10000 },
        quantity: { type: 'number', example: 10 },
        sizes: {
          type: 'array',
          items: { type: 'string' },
          example: ['S', 'M', 'L'],
        },
        categoryId: { type: 'number', example: 1 },
        image: { type: 'array', items: { type: 'string', format: 'binary' } },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: '상품이 성공적으로 업로드되었습니다.',
    schema: {
      example: {
        id: 1,
        name: '상품명',
        description: '상품 설명',
        price: 10000,
        quantity: 10,
        sizes: ['S', 'M', 'L'],
        categoryId: 1,
        images: ['image1.png', 'image2.png'],
        view_count: 0,
      },
    },
  })
  @Post('upload')
  @UseGuards(AccessTokenGuard)
  @Roles(RolesEnum.ADMIN)
  @UseInterceptors(FilesInterceptor('image'))
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const fileNames = files.map((file) => file.filename);
    return this.productsService.createProduct(createProductDto, fileNames);
  }

  @ApiOperation({
    summary: '상품 목록 조회',
    description: '상품 목록을 페이지네이션 형태로 가져옵니다.',
  })
  @ApiQuery({
    name: 'where__id_more_than',
    description: '이 ID보다 큰 상품만 조회',
    required: false,
    example: 5,
  })
  @ApiQuery({
    name: 'order__createdAt',
    description: '생성일 기준 정렬 (ASC)',
    required: false,
    example: 'ASC',
  })
  @ApiQuery({
    name: 'take',
    description: '한 번에 가져올 상품 수',
    required: false,
    example: 10,
  })
  @ApiResponse({
    status: 200,
    description: '상품 목록이 성공적으로 반환됩니다.',
    schema: {
      example: {
        data: [
          {
            id: 1,
            name: '상품명',
            description: '상품 설명',
            price: 10000,
            quantity: 10,
            sizes: ['S', 'M', 'L'],
            categoryId: 1,
            images: ['image1.png'],
            view_count: 0,
          },
        ],
        cursor: { after: 5 },
        count: 10,
        next: 'http://localhost/products?where__id_more_than=10',
      },
    },
  })
  @Get()
  @Roles(RolesEnum.USER)
  getProducts(@Query() query: PaginateProductsDto) {
    return this.productsService.paginateProducts(query);
  }

  @ApiOperation({
    summary: '상품 상세 조회',
    description: '특정 상품의 상세 정보를 가져옵니다.',
  })
  @ApiResponse({
    status: 200,
    description: '상품의 상세 정보가 반환됩니다.',
    schema: {
      example: {
        id: 1,
        name: '상품명',
        description: '상품 설명',
        price: 10000,
        quantity: 10,
        sizes: ['S', 'M', 'L'],
        categoryId: 1,
        images: ['image1.png'],
        view_count: 10,
      },
    },
  })
  @Get(':id')
  async getProduct(@Param('id') id: number) {
    await this.productsService.incrementViewCount(id);
    return this.productsService.findById(id);
  }
}
