import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { AdminGuard } from 'src/admins/guard/admins.guard';
import { RolesEnum } from 'src/common/const/roles.const';
import { Roles } from 'src/admins/decorator/roles.decorator';

@Controller('admin/categories')
// @UseGuards(AdminGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @Roles(RolesEnum.ADMIN)
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.createCategory(createCategoryDto);
  }
}
