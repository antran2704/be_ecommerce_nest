import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dtos/login.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiBody({
    type: LoginDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Login successfully',
    example: {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    },
  })
  @ApiResponse({
    status: 401,
    description: 'User or password is incorrect',
  })
  async login(@Body() payload: LoginDto) {
    return await this.authService.login(payload);
  }
}
