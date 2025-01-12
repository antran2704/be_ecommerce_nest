import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { AuthCommonService } from "src/common/auth/services/auth.service";
import { LoginRequestDto, NewAccessTokenRequestDto } from "../dtos";
import { AUTH_MESSAGES } from "../messages/auth.error";
import { IAuthService } from "../interfaces/auth_service.interface";
import { IAccessTokenPayload } from "../interfaces/access_token_payload.interface";
import { IRefreshTokenPayload } from "../interfaces/refresh_token_payload.interface";
import { AdminService } from "src/modules/admin/services/admin.service";

const listUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "phamtrangiaan27@gmail.com",
    password: "123456",
    isAdmin: true,
  },
  {
    id: "2",
    name: "John Doe 2",
    email: "phamtrangiaan28@gmail.com",
    password: "123456",
    isAdmin: false,
  },
];

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private authCommonService: AuthCommonService,
    private adminService: AdminService,
    private configService: ConfigService,
  ) {}

  async login(data: LoginRequestDto) {
    const { email, password } = data;

    const user = listUsers.find(
      (user) => user.email === email && user.password === password,
    );

    if (!user) {
      throw new UnauthorizedException(
        AUTH_MESSAGES.EMAIL_OR_PASSWORD_INCORRECT,
      );
    }

    const accessToken =
      this.authCommonService.generateToken<IAccessTokenPayload>(
        {
          userId: user.id,
          isAdmin: user.isAdmin,
        },
        {
          secret: this.configService.get<string>("auth.accessTokenSecret"),
          expiresIn: this.configService.get<string>(
            "auth.accessTokenExpiresIn",
          ),
        },
      );

    const refreshToken =
      this.authCommonService.generateToken<IRefreshTokenPayload>(
        {
          userId: user.id,
        },
        {
          secret: this.configService.get<string>("auth.refreshTokenSecret"),
          expiresIn: this.configService.get<string>(
            "auth.refreshTokenExpiresIn",
          ),
        },
      );

    return { accessToken, refreshToken };
  }

  async getNewAccessToken(payload: NewAccessTokenRequestDto) {
    const { accessToken, refreshToken } = payload;

    const decodedRefreshToken: IRefreshTokenPayload =
      await this.authCommonService.verifyToken(refreshToken, {
        secret: this.configService.get<string>("auth.refreshTokenSecret"),
        ignoreExpiration: true,
      });

    const decodedAccessToken: IAccessTokenPayload =
      await this.authCommonService.verifyToken(accessToken, {
        secret: this.configService.get<string>("auth.accessTokenSecret"),
        ignoreExpiration: true,
      });

    // Check if access token and refresh token belong to the same user
    if (decodedRefreshToken.userId !== decodedAccessToken.userId) {
      throw new UnauthorizedException("REFRESH_TOKEN_INVALID");
    }

    const isRefreshTokenExpired =
      await this.authCommonService.isTokenHasExpired(refreshToken, {
        secret: this.configService.get<string>("auth.refreshTokenSecret"),
        ignoreExpiration: false,
      });

    // Check if refresh token is expired
    if (isRefreshTokenExpired) {
      throw new UnauthorizedException("REFRESH_TOKEN_EXPIRED");
    }

    const user = listUsers.find(
      (user) => user.id === decodedAccessToken.userId,
    );

    const newAccessToken =
      this.authCommonService.generateToken<IAccessTokenPayload>(
        {
          userId: user.id,
          isAdmin: user.isAdmin,
        },
        {
          secret: this.configService.get<string>("auth.accessTokenSecret"),
          expiresIn: this.configService.get<string>(
            "auth.accessTokenExpiresIn",
          ),
        },
      );

    return { newAccessToken };
  }
}
