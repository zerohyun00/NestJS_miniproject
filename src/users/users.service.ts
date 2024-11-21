import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersRepository } from './entities/user.repository';
import { UsersModel } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(
    user: Pick<
      UsersModel,
      'email' | 'password' | 'gender' | 'address' | 'mobile_number'
    >,
  ) {
    const emailExists = await this.usersRepository.checkEmailExists(user.email);

    if (emailExists) {
      throw new BadRequestException('이미 가입한 이메일 입니다.');
    }

    const userInfo = this.usersRepository.create({
      email: user.email,
      password: user.password,
      address: user.address,
      gender: user.gender,
      mobile_number: user.mobile_number,
    });

    return this.usersRepository.save(userInfo);
  }

  async getUserByEmail(email: string): Promise<UsersModel | null> {
    return this.usersRepository.findByEmail(email);
  }

  async getAllUsers(): Promise<UsersModel[]> {
    return this.usersRepository.find();
  }
}
