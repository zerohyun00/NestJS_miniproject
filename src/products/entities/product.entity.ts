import { BaseModel } from 'src/common/entities/base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ProductsImageModel } from './product-image.entity';
import { CategoriesModel } from 'src/categories/entities/category.entity';

@Entity()
export class ProductsModel extends BaseModel {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @OneToMany(() => ProductsImageModel, (image) => image.product, {
    cascade: true,
  })
  images: ProductsImageModel;

  @Column('simple-array')
  sizes: string[];

  @ManyToOne(() => CategoriesModel, (category) => category.products, {
    onDelete: 'CASCADE',
  })
  category: CategoriesModel;
}
