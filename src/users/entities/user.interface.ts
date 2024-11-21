import { Repository } from 'typeorm';
import { UsersModel } from './user.entity';

export interface IUsersRepository extends Repository<UsersModel> {
  findByEmail(email: string): Promise<UsersModel>;
  checkEmailExists(email: string): Promise<boolean>;
}
