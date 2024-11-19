import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesEnum } from 'src/common/const/roles.const';
import { Roles } from 'src/admins/decorator/roles.decorator';
import { AccessTokenGuard } from 'src/auth/guard/bearer-token-guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AccessTokenGuard)
  @Roles(RolesEnum.ADMIN)
  getUsers() {
    return this.usersService.getAllUsers();
  }
}
