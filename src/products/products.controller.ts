import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { AdminGuard } from 'src/admins/guard/admins.guard';
import { RolesEnum } from 'src/common/const/roles.const';
import { Roles } from 'src/admins/decorator/roles.decorator';

@Controller('admin/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('upload')
  @Roles(RolesEnum.ADMIN)
  @UseInterceptors(FilesInterceptor('image'))
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() file: Express.Multer.File,
  ) {
    return this.productsService.createProduct(createProductDto, file?.filename);
  }
}
