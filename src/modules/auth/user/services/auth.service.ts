import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as dayjs from "dayjs";

import { AuthCommonService } from "src/common/auth/services/auth.service";
import { AUTH_ERROR_MESSAGES } from "../../messages/auth.error";
import { AdminService } from "src/modules/admin/services/admin.service";
import { generateOTP } from "src/helpers/OTP";
import { MailService } from "src/common/mail/services/mail.service";
import { IAuthUserService } from "../interfaces/auth_service.interface";
import { IAccessTokenUserPayload } from "../interfaces/access_token_payload.interface";
import { IRefreshTokenUserPayload } from "../interfaces/refresh_token_payload.interface";
import { UserAuthTokenService } from "src/modules/auth_token/services";
import LoginSystemUserRequestDto from "../dtos/services/login_system_request.dto";
import LoginUserResponseDto from "../dtos/services/login_response.dto";
import LogoutUserRequestDto from "../dtos/services/logout_request.dto";
import NewAccessTokenRequestDto from "../../dtos/new_access_token_request.dto";
import NewAccessTokenResponseDto from "../../dtos/new_access_token_response.dto";
import ForgotPasswordUserRequestDto from "../dtos/services/forgot_password_request.dto";
import ForgotPasswordUserResponseDto from "../dtos/services/forgot_password_response.dto";
import {
  ConfirmOtpForgotPasswordUserRequestDto,
  ResetPasswordUserRequestDto,
} from "../dtos";

@Injectable()
export class AuthUserService implements IAuthUserService {
  constructor(
    private authCommonService: AuthCommonService,
    private adminService: AdminService,
    private authTokenService: UserAuthTokenService,
    private configService: ConfigService,
    private readonly mailService: MailService,
  ) {}

  async login(data: LoginSystemUserRequestDto): Promise<LoginUserResponseDto> {
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

    const isMatchPassword = await this.authCommonService.compareHashData(
      password,
      user.password,
    );

    if (!isMatchPassword) {
      throw new UnauthorizedException(
        AUTH_ERROR_MESSAGES.EMAIL_OR_PASSWORD_INCORRECT,
      );
    }

    const accessToken =
      this.authCommonService.generateToken<IAccessTokenUserPayload>(
        {
          userId: user.id,
        },
        {
          secret: this.configService.get<string>("auth.accessTokenSecret"),
          expiresIn: this.configService.get<string>(
            "auth.accessTokenExpiresIn",
          ),
        },
      );

    const refreshToken =
      this.authCommonService.generateToken<IRefreshTokenUserPayload>(
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

  async logout(payload: LogoutUserRequestDto): Promise<void> {
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

  async getNewAccessToken(
    payload: NewAccessTokenRequestDto,
  ): Promise<NewAccessTokenResponseDto> {
    const { accessToken, refreshToken } = payload;

    const decodedRefreshToken: IRefreshTokenUserPayload =
      await this.authCommonService.verifyToken(refreshToken, {
        secret: this.configService.get<string>("auth.refreshTokenSecret"),
        ignoreExpiration: true,
      });

    const decodedAccessToken: IAccessTokenUserPayload =
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
      this.authCommonService.generateToken<IAccessTokenUserPayload>(
        {
          userId: user.id,
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

  async forgotPassword(
    data: ForgotPasswordUserRequestDto,
  ): Promise<ForgotPasswordUserResponseDto> {
    // check user is exited
    const user = await this.adminService.getAdminEntityByEmail(data.email);

    const newOtp = generateOTP();
    const otpHash = await this.authCommonService.hashData(newOtp);

    const otpExpireConfig = this.configService.get<string>(
      "forgotPassword.expiresIn",
    );

    const otpExpiresIn = dayjs()
      .add(Number(otpExpireConfig), "minutes")
      .toISOString();

    // Send email
    this.mailService.sendOtpForgotPassword({
      otp: newOtp,
      toEmail: data.email,
    });

    // Update forgot otp and expire of otp
    this.authTokenService.updateForgotOtp(user.id, {
      forgotOtp: otpHash,
      forgotOtpExpireAt: otpExpiresIn,
    });

    return { otp: newOtp, expireAt: otpExpiresIn };
  }

  async confirmOtpForgotPassword(
    data: ConfirmOtpForgotPasswordUserRequestDto,
  ): Promise<void> {
    // check user is exited
    const user = await this.adminService.getAdminEntityByEmail(data.email);

    const authToken = await this.authTokenService.getAuthTokenByUserId(user.id);

    const isOtpCorrect = await this.authCommonService.compareHashData(
      data.otp,
      authToken.forgot_otp,
    );

    if (!isOtpCorrect) {
      throw new BadRequestException(AUTH_ERROR_MESSAGES.OTP_FOGOT_INVALID);
    }

    if (dayjs(authToken.forgot_otp_expire_at).isBefore(dayjs())) {
      throw new BadRequestException(AUTH_ERROR_MESSAGES.OTP_FOGOT_EXPIRED);
    }
  }

  async resetPassword(data: ResetPasswordUserRequestDto): Promise<void> {
    // check user is exited
    const user = await this.adminService.getAdminEntityByEmail(data.email);

    const authToken = await this.authTokenService.getAuthTokenByUserId(user.id);

    if (dayjs(authToken.forgot_otp_expire_at).isBefore(dayjs())) {
      throw new BadRequestException(AUTH_ERROR_MESSAGES.OTP_FOGOT_EXPIRED);
    }

    const isOtpCorrect = await this.authCommonService.compareHashData(
      data.otp,
      authToken.forgot_otp,
    );

    if (!isOtpCorrect) {
      throw new BadRequestException(AUTH_ERROR_MESSAGES.OTP_FOGOT_INVALID);
    }

    await this.adminService.resetPassword(user.id, {
      newPassword: data.newPassword,
    });

    // reset forgot otp
    this.authTokenService.updateForgotOtp(user.id, {
      forgotOtp: "",
      forgotOtpExpireAt: "",
    });
  }
}
