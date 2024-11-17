import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AdminsService } from './admins.service';

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}
}
