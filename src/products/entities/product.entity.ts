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

  @Column('simple-array', { nullable: true })
  images: string[];

  @Column('simple-json', { nullable: true })
  sizes: string[];

  @ManyToOne(() => CategoriesModel, (category) => category.products, {
    onDelete: 'CASCADE',
  })
  category: CategoriesModel;

  @Column({
    default: 0,
  })
  view_count: number;
}
