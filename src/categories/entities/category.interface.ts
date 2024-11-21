import { Repository } from 'typeorm';
import { CategoriesModel } from './category.entity';

export interface ICategoriesRepository extends Repository<CategoriesModel> {
  findByName(name: string): Promise<CategoriesModel>;
}
