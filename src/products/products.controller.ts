import {
  Body,
  Controller,
  Get,
  Post,
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

@Controller('products')
@UseInterceptors(LogInterceptor)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

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

  @Get()
  getProducts(@Query() query: PaginateProductsDto) {
    return this.productsService.paginateProducts(query);
  }
}
