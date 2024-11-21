import { Repository } from 'typeorm';
import { AdminsModel } from './admin.entity';

export interface IAdminsRepository extends Repository<AdminsModel> {
  findByEmail(email: string): Promise<AdminsModel>;
}
