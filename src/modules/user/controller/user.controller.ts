import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/auth/guards/jwt-auth.guard';

@ApiTags('user')
@ApiBearerAuth()
@Controller({
  version: '1',
  path: 'user',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUsers() {
    return await this.userService.getUsers();
  }

  @Post()
  async createUser(name: string, email: string) {
    return await this.userService.createUser(name, email);
  }
}
