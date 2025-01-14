import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { AuthCommonService } from "src/common/auth/services/auth.service";
import {
  LoginRequestDto,
  LogoutRequestDto,
  NewAccessTokenRequestDto,
} from "../dtos";
import { AUTH_ERROR_MESSAGES } from "../messages/auth.error";
import { IAuthService } from "../interfaces/auth_service.interface";
import { IAccessTokenPayload } from "../interfaces/access_token_payload.interface";
import { IRefreshTokenPayload } from "../interfaces/refresh_token_payload.interface";
import { AdminService } from "src/modules/admin/services/admin.service";
import { AuthTokenService } from "src/modules/authToken/services/auth_token.service";

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private authCommonService: AuthCommonService,
    private adminService: AdminService,
    private authTokenService: AuthTokenService,
    private configService: ConfigService,
  ) {}

  async login(data: LoginRequestDto) {
    const { email, password } = data;

    const user = await this.adminService.getAdminEntityByEmail(email);
    if (!user) {
      throw new UnauthorizedException(
        AUTH_ERROR_MESSAGES.EMAIL_OR_PASSWORD_INCORRECT,
      );
    }

    if (!user.is_active) {
      throw new BadRequestException(AUTH_ERROR_MESSAGES.USER_WAS_DISABLED);
    }

    const isMatchPassword = await this.authCommonService.comparePassword(
      password,
      user.password,
    );

    if (!isMatchPassword) {
      throw new UnauthorizedException(
        AUTH_ERROR_MESSAGES.EMAIL_OR_PASSWORD_INCORRECT,
      );
    }

    const accessToken =
      this.authCommonService.generateToken<IAccessTokenPayload>(
        {
          userId: user.id,
          isAdmin: user.is_admin,
          role: user.role_id,
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

    // Update refresh token
    await this.authTokenService.updateRefreshToken(user.id, {
      refreshToken,
    });

    return { accessToken, refreshToken };
  }

  async logout(payload: LogoutRequestDto): Promise<void> {
    const user = await this.adminService.getAdminEntityById(payload.userId);

    if (!user) {
      throw new UnauthorizedException(
        AUTH_ERROR_MESSAGES.EMAIL_OR_PASSWORD_INCORRECT,
      );
    }

    if (!user.is_active) {
      throw new BadRequestException(AUTH_ERROR_MESSAGES.USER_WAS_DISABLED);
    }

    const authToken = await this.authTokenService.getAuthTokenByUserId(
      payload.userId,
    );

    if (!authToken.refresh_token) {
      throw new BadRequestException(AUTH_ERROR_MESSAGES.USER_NOT_LOGIN);
    }

    // Update refresh token
    await this.authTokenService.updateRefreshToken(user.id, {
      refreshToken: "",
    });
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
      throw new UnauthorizedException(
        AUTH_ERROR_MESSAGES.REFRESH_TOKEN_INVALID,
      );
    }

    const isRefreshTokenExpired =
      await this.authCommonService.isTokenHasExpired(refreshToken, {
        secret: this.configService.get<string>("auth.refreshTokenSecret"),
        ignoreExpiration: false,
      });

    // Check if refresh token is expired
    if (isRefreshTokenExpired) {
      throw new UnauthorizedException(
        AUTH_ERROR_MESSAGES.REFRESH_TOKEN_EXPIRED,
      );
    }

    const authTokenOfUser = await this.authTokenService.getAuthTokenByUserId(
      decodedRefreshToken.userId,
    );

    if (authTokenOfUser.refresh_token !== refreshToken) {
      throw new UnauthorizedException(
        AUTH_ERROR_MESSAGES.REFRESH_TOKEN_INVALID,
      );
    }

    const user = await this.adminService.getAdminEntityById(
      decodedRefreshToken.userId,
    );

    const newAccessToken =
      this.authCommonService.generateToken<IAccessTokenPayload>(
        {
          userId: user.id,
          isAdmin: user.is_admin,
          role: user.role_id,
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
