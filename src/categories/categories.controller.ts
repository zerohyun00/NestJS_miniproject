import {
  Body,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { RolesEnum } from 'src/common/const/roles.const';
import { Roles } from 'src/admins/decorator/roles.decorator';
import { LogInterceptor } from 'src/common/interceptor/log.interceptor';
import { AccessTokenGuard } from 'src/auth/guard/bearer-token-guard';

@Controller('admin/categories')
@UseInterceptors(LogInterceptor)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  @Roles(RolesEnum.ADMIN)
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.createCategory(createCategoryDto);
  }
}
