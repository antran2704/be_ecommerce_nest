import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { UserService } from '../services/user.service';
import { JwtAuthGuard } from 'src/common/auth/guards/jwt-auth.guard';

@ApiBearerAuth()
@Controller({
  version: '1',
  path: 'user',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUsers(@Request() req) {
    return await this.userService.getUsers();
  }

  @Post()
  async createUser(name: string, email: string) {
    return await this.userService.createUser(name, email);
  }
}
