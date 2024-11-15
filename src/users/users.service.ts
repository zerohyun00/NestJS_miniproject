import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersModel } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersModel)
    private readonly usersRepository: Repository<UsersModel>,
  ) {}

  async createUser(
    user: Pick<
      UsersModel,
      'email' | 'password' | 'gender' | 'address' | 'mobile_number'
    >,
  ) {
    const emailExists = await this.usersRepository.exists({
      where: {
        email: user.email,
      },
    });

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

    const newUser = await this.usersRepository.save(userInfo);
    return newUser;
  }

  async getUserByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }
}
