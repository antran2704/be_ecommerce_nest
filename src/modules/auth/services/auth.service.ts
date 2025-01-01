import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from '../dtos/login.dto';
import { AuthCommonService } from 'src/common/auth/services/auth.service';
import { ConfigService } from '@nestjs/config';
import { NewAccessTokenDto } from '../dtos/newAccessToken.dto';
import {
  IAccessTokenPayload,
  IRefreshTokenPayload,
} from '../interfaces/auth.interface';

const listUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'phamtrangiaan27@gmail.com',
    password: '123456',
    isAdmin: true,
  },
  {
    id: '2',
    name: 'John Doe 2',
    email: 'phamtrangiaan28@gmail.com',
    password: '123456',
    isAdmin: false,
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
    const accessToken =
      this.authCommonService.generateToken<IAccessTokenPayload>(
        {
          id: user.id,
          isAdmin: user.isAdmin,
        },
        {
          secret: this.configService.get<string>('auth.accessTokenSecret'),
          expiresIn: this.configService.get<string>(
            'auth.accessTokenExpiresIn',
          ),
        },
      );

    const refreshToken =
      this.authCommonService.generateToken<IRefreshTokenPayload>(
        {
          id: user.id,
        },
        {
          secret: this.configService.get<string>('auth.refreshTokenSecret'),
          expiresIn: this.configService.get<string>(
            'auth.refreshTokenExpiresIn',
          ),
        },
      );

    return { accessToken, refreshToken };
  }

  async getNewAccessToken(payload: NewAccessTokenDto) {
    const { accessToken, refreshToken } = payload;

    const decodedRefreshToken: IRefreshTokenPayload =
      await this.authCommonService.verifyToken(refreshToken, {
        secret: this.configService.get<string>('auth.refreshTokenSecret'),
        ignoreExpiration: true,
      });

    const decodedAccessToken: IAccessTokenPayload =
      await this.authCommonService.verifyToken(accessToken, {
        secret: this.configService.get<string>('auth.accessTokenSecret'),
        ignoreExpiration: true,
      });

    // Check if access token and refresh token belong to the same user
    if (decodedRefreshToken.id !== decodedAccessToken.id) {
      throw new UnauthorizedException('REFRESH_TOKEN_INVALID');
    }

    const isRefreshTokenExpired =
      await this.authCommonService.isTokenHasExpired(refreshToken, {
        secret: this.configService.get<string>('auth.refreshTokenSecret'),
        ignoreExpiration: false,
      });

    // Check if refresh token is expired
    if (isRefreshTokenExpired) {
      throw new UnauthorizedException('REFRESH_TOKEN_EXPIRED');
    }

    const user = listUsers.find((user) => user.id === decodedAccessToken.id);

    const newAccessToken =
      this.authCommonService.generateToken<IAccessTokenPayload>(
        {
          id: user.id,
          isAdmin: user.isAdmin,
        },
        {
          secret: this.configService.get<string>('auth.accessTokenSecret'),
          expiresIn: this.configService.get<string>(
            'auth.accessTokenExpiresIn',
          ),
        },
      );

    return { newAccessToken };
  }
}
