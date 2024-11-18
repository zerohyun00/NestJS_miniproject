import { BaseModel } from 'src/common/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
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

  @Column()
  image?: string;

  @Column('simple-json')
  sizes: string[];

  @ManyToOne(() => CategoriesModel, (category) => category.products, {
    onDelete: 'CASCADE',
  })
  category: CategoriesModel;
}
