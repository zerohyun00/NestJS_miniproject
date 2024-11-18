import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsModel } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsModel)
    private readonly productRepository: Repository<ProductsModel>,
    private readonly categoriesService: CategoriesService,
  ) {}

  async createProduct(createProductDto: CreateProductDto, image: string) {
    const { categoryId, ...productData } = createProductDto;
    const category = await this.categoriesService.getCategoryById(categoryId);

    const product = this.productRepository.create({
      ...productData,
      image,
      category,
    });

    return this.productRepository.save(product);
  }
}
