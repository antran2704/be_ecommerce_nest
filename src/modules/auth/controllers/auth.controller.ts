import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dtos/login.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { NewAccessTokenDto } from '../dtos/newAccessToken.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
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

  @Post('/refreshToken')
  @ApiBody({
    type: NewAccessTokenDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Get new access token successfully',
    example: {
      newAccessToken: 'abc.xyz.123',
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Token invalid',
  })
  async refreshToken(@Body() payload: NewAccessTokenDto) {
    return await this.authService.getNewAccessToken(payload);
  }
}
