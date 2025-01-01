import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from '../dtos/login.dto';
import { AuthCommonService } from 'src/common/auth/services/auth.service';
import { ConfigService } from '@nestjs/config';

const listUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'phamtrangiaan27@gmail.com',
    password: '123456',
  },
];

@Injectable()
export class AuthService {
  constructor(
    private authCommonService: AuthCommonService,
    private configService: ConfigService,
  ) {}

  async login(data: LoginDto) {
    const { email, password } = data;
    const user = listUsers.find(
      (user) => user.email === email && user.password === password,
    );

    if (!user) {
      throw new UnauthorizedException('EMAIL_OR_PASSWORD_INCORRECT');
    }

    // TODO: hash password and compare password in DB

    const accessToken = this.authCommonService.generateToken(
      {
        id: user.id,
        email: user.email,
      },
      {
        secret: this.configService.get<string>('auth.accessTokenSecret'),
        expiresIn: this.configService.get<string>('auth.accessTokenExpiresIn'),
      },
    );

    const refreshToken = this.authCommonService.generateToken(
      {
        id: user.id,
        email: user.email,
      },
      {
        secret: this.configService.get<string>('auth.refreshTokenSecret'),
        expiresIn: this.configService.get<string>('auth.refreshTokenExpiresIn'),
      },
    );

    return { accessToken, refreshToken };
  }
}
