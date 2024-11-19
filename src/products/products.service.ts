import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsModel } from './entities/product.entity';
import { MoreThan, Repository } from 'typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { PaginateProductsDto } from './dto/paginate-products.dto';
import { HOST, PROTOCOL } from 'src/common/const/env-keys.const';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsModel)
    private readonly productRepository: Repository<ProductsModel>,
    private readonly categoriesService: CategoriesService,
  ) {}

  async createProduct(createProductDto: CreateProductDto, images: string[]) {
    const { categoryId, ...productData } = createProductDto;
    const category = await this.categoriesService.getCategoryById(categoryId);

    const product = this.productRepository.create({
      ...productData,
      images, // 콤마로 구분된 파일 이름들
      category,
    });

    return this.productRepository.save(product);
  }

  async getAllProducts() {
    return this.productRepository.find({
      relations: ['category'],
    });
  }

  async paginateProducts(dto: PaginateProductsDto) {
    const products = await this.productRepository.find({
      where: {
        id: MoreThan(dto.where__id_more_than ?? 0),
      },
      order: {
        createdAt: dto.order__createdAt,
      },
      take: dto.take,
      relations: ['category'],
    });

    const lastItem =
      products.length > 0 && products.length === dto.take
        ? products[products.length - 1]
        : null;

    const nextUrl = lastItem && new URL(`${PROTOCOL}://${HOST}/products`);

    for (const key of Object.keys(dto)) {
      if (dto[key]) {
        if (key !== 'where__id_more_than') {
          nextUrl.searchParams.append(key, dto[key]);
        }
      }
    }
    nextUrl.searchParams.append('where__id_more_than', lastItem.id.toString());

    return {
      data: products,
      cursor: {
        after: lastItem?.id ?? null,
      },
      count: products.length,
      next: nextUrl?.toString() ?? null,
    };
  }
}
