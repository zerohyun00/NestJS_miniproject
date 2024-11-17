import { BaseModel } from 'src/common/entities/base.entity';
import { ProductsModel } from 'src/products/entities/product.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class CategoriesModel extends BaseModel {
  @Column({
    unique: true,
  })
  name: string;

  @OneToMany(() => ProductsModel, (product) => product.category)
  products: ProductsModel[];
}
