import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as dayjs from "dayjs";
import { ClerkClient, User, verifyToken } from "@clerk/backend";

import { AuthCommonService } from "~/common/auth/services/auth.service";
import { AUTH_ERROR_MESSAGES } from "../../messages/auth.error";
import { generateOTP } from "~/helpers/OTP";
import { MailService } from "~/common/mail/services/mail.service";
import { IAuthUserService } from "../interfaces/auth_service.interface";
import { IAccessTokenUserPayload } from "../interfaces/access_token_payload.interface";
import { IRefreshTokenUserPayload } from "../interfaces/refresh_token_payload.interface";
import { UserAuthTokenService } from "~/modules/auth_token/services";
import LoginSystemUserRequestDto from "../dtos/services/login_system_request.dto";
import LoginUserResponseDto from "../dtos/services/login_response.dto";
import LogoutUserRequestDto from "../dtos/services/logout_request.dto";
import NewAccessTokenRequestDto from "../../dtos/new_access_token_request.dto";
import NewAccessTokenResponseDto from "../../dtos/new_access_token_response.dto";
import ForgotPasswordUserRequestDto from "../dtos/services/forgot_password_request.dto";
import ForgotPasswordUserResponseDto from "../dtos/services/forgot_password_response.dto";
import {
  ConfirmOtpForgotPasswordUserRequestDto,
  ConfirmSignupOtpRequestDto,
  LoginWithProviderRequestDto,
  ResetPasswordUserRequestDto,
  SendSignupOtpRequestDto,
  SendSignupOtpResponseDto,
  SignupUserRequestDto,
} from "../dtos";
import { UserService } from "~/modules/user/services/user.service";
import { AuthProviderService } from "~/modules/auth_provider/services/auth_provider.service";
import { ENUM_AUTH_PROVIDER } from "~/modules/auth_provider/enums/provider.enum";

@Injectable()
export class AuthUserService implements IAuthUserService {
  constructor(
    @Inject("ClerkClient")
    private readonly clerkClient: ClerkClient,

    private userService: UserService,

    private authCommonService: AuthCommonService,
    private authTokenService: UserAuthTokenService,
    private authProviderService: AuthProviderService,

    private configService: ConfigService,
    private readonly mailService: MailService,
  ) {}

  async login(data: LoginSystemUserRequestDto): Promise<LoginUserResponseDto> {
    const { email, password } = data;

    const user = await this.userService.getUserEntityByEmail(email);
    if (!user) {
      throw new UnauthorizedException(
        AUTH_ERROR_MESSAGES.EMAIL_OR_PASSWORD_INCORRECT,
      );
    }

    if (!user.is_active) {
      throw new BadRequestException(AUTH_ERROR_MESSAGES.USER_NOT_EXIST);
    }

    if (user.is_banned) {
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

  async loginWithProvider(
    data: LoginWithProviderRequestDto,
  ): Promise<LoginUserResponseDto> {
    try {
      const tokenPayload = await verifyToken(data.accessToken, {
        secretKey: this.configService.get("clerk.secretKey"),
      });
      const userClerk: User = await this.clerkClient.users.getUser(
        tokenPayload.sub,
      );
      const externalAccount = userClerk.externalAccounts.find((account) => {
        return account.verification.strategy.includes(data.provider);
      });

      if (!externalAccount)
        throw new BadRequestException(
          AUTH_ERROR_MESSAGES.EXTERNAL_ACCOUNT_NOT_FOUND,
        );

      const user = await this.userService.getUserEntityByEmail(
        externalAccount.emailAddress,
      );

      let userId: string;

      if (user) {
        userId = user.id;

        const isExitProvider = await this.authProviderService.getAuthProvider({
          provider: data.provider,
          userId: user.id,
        });

        if (!isExitProvider) {
          this.authProviderService.createAuthProvider({
            provider: data.provider,
            userId: user.id,
            providerId: externalAccount.id,
          });
        }
      } else {
        userId = await this.userService.createUserWithProvider({
          email: externalAccount.emailAddress,
          provider: data.provider,
          providerId: externalAccount.id,
        });
      }

      const accessToken =
        this.authCommonService.generateToken<IAccessTokenUserPayload>(
          {
            userId,
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
            userId,
          },
          {
            secret: this.configService.get<string>("auth.refreshTokenSecret"),
            expiresIn: this.configService.get<string>(
              "auth.refreshTokenExpiresIn",
            ),
          },
        );

      // Update refresh token
      await this.authTokenService.updateRefreshToken(userId, {
        refreshToken,
      });

      return { accessToken, refreshToken };
    } catch (error) {
      throw new BadRequestException(AUTH_ERROR_MESSAGES.TOKEN_INVALID);
    }
  }

  async signup(data: SignupUserRequestDto): Promise<void> {
    const user = await this.userService.getUserEntityByEmail(data.email);

    if (!user) {
      throw new BadRequestException(AUTH_ERROR_MESSAGES.USER_NOT_EXIST);
    }

    const authToken = await this.authTokenService.getAuthTokenByUserId(user.id);

    // check otp
    const isOtpCorrect = await this.authCommonService.compareHashData(
      data.otp,
      authToken.signup_otp,
    );

    if (!isOtpCorrect) {
      throw new BadRequestException(AUTH_ERROR_MESSAGES.OTP_INVALID);
    }

    // check otp expired
    if (dayjs(authToken.signup_otp_expire_at).isBefore(dayjs())) {
      throw new BadRequestException(AUTH_ERROR_MESSAGES.OTP_EXPIRED);
    }

    // update password for user
    await this.userService.signupPassword(user.id, { password: data.password });

    // active user
    await this.userService.activeUser(user.id);

    // reset signup otp
    this.authTokenService.updateSignupOtp(user.id, {
      signupOtp: "",
      signupOtpExpireAt: "",
    });
  }

  async sendSignupOtp(
    data: SendSignupOtpRequestDto,
  ): Promise<SendSignupOtpResponseDto> {
    // check user and provider are exited
    const user = await this.userService.getUserEntityByEmail(data.email);
    let userId: string;

    if (!user) {
      userId = await this.userService.createUserWithSystem(data);
    } else {
      userId = user.id;
    }

    const authProvider = await this.authProviderService.getAuthProvider({
      userId,
      provider: ENUM_AUTH_PROVIDER.SYSTEM,
    });

    if (authProvider && user.is_active) {
      throw new BadRequestException(AUTH_ERROR_MESSAGES.USER_EXISTED);
    }

    const newOtp = generateOTP();
    const otpHash = await this.authCommonService.hashData(newOtp);

    const otpExpireConfig = this.configService.get<string>(
      "forgotPassword.expiresIn",
    );

    const otpExpiresIn = dayjs()
      .add(Number(otpExpireConfig), "minutes")
      .toISOString();

    // Send email
    this.mailService.sendOtpSignupUser({
      otp: newOtp,
      toEmail: data.email,
    });

    // Update forgot otp and expire of otp
    this.authTokenService.updateSignupOtp(userId, {
      signupOtp: otpHash,
      signupOtpExpireAt: otpExpiresIn,
    });

    return { otp: newOtp, expireAt: otpExpiresIn };
  }

  async confirmSignupOtp(data: ConfirmSignupOtpRequestDto): Promise<void> {
    // check user is exited
    const user = await this.userService.getUserEntityByEmail(data.email);

    if (!user) {
      throw new BadRequestException(AUTH_ERROR_MESSAGES.USER_NOT_EXIST);
    }

    const authToken = await this.authTokenService.getAuthTokenByUserId(user.id);

    const isOtpCorrect = await this.authCommonService.compareHashData(
      data.otp,
      authToken.signup_otp,
    );

    if (!isOtpCorrect) {
      throw new BadRequestException(AUTH_ERROR_MESSAGES.OTP_INVALID);
    }

    if (dayjs(authToken.forgot_otp_expire_at).isBefore(dayjs())) {
      throw new BadRequestException(AUTH_ERROR_MESSAGES.OTP_EXPIRED);
    }
  }

  async logout(payload: LogoutUserRequestDto): Promise<void> {
    const user = await this.userService.getUserEntityById(payload.userId);

    if (!user) {
      throw new UnauthorizedException(
        AUTH_ERROR_MESSAGES.EMAIL_OR_PASSWORD_INCORRECT,
      );
    }

    if (user.is_banned) {
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

    const user = await this.userService.getUserEntityById(
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
    const user = await this.userService.getUserEntityByEmail(data.email);

    if (!user || !user.is_active || user.is_banned) {
      throw new BadRequestException(AUTH_ERROR_MESSAGES.USER_NOT_EXIST);
    }

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
    const user = await this.userService.getUserEntityByEmail(data.email);

    if (!user || !user.is_active || user.is_banned) {
      throw new BadRequestException(AUTH_ERROR_MESSAGES.USER_NOT_EXIST);
    }

    const authToken = await this.authTokenService.getAuthTokenByUserId(user.id);

    const isOtpCorrect = await this.authCommonService.compareHashData(
      data.otp,
      authToken.forgot_otp,
    );

    if (!isOtpCorrect) {
      throw new BadRequestException(AUTH_ERROR_MESSAGES.OTP_INVALID);
    }

    if (dayjs(authToken.forgot_otp_expire_at).isBefore(dayjs())) {
      throw new BadRequestException(AUTH_ERROR_MESSAGES.OTP_EXPIRED);
    }
  }

  async resetPassword(data: ResetPasswordUserRequestDto): Promise<void> {
    // check user is exited
    const user = await this.userService.getUserEntityByEmail(data.email);

    if (!user || !user.is_active || user.is_banned) {
      throw new BadRequestException(AUTH_ERROR_MESSAGES.USER_NOT_EXIST);
    }

    const authToken = await this.authTokenService.getAuthTokenByUserId(user.id);

    if (dayjs(authToken.forgot_otp_expire_at).isBefore(dayjs())) {
      throw new BadRequestException(AUTH_ERROR_MESSAGES.OTP_EXPIRED);
    }

    const isOtpCorrect = await this.authCommonService.compareHashData(
      data.otp,
      authToken.forgot_otp,
    );

    if (!isOtpCorrect) {
      throw new BadRequestException(AUTH_ERROR_MESSAGES.OTP_INVALID);
    }

    await this.userService.resetPassword(user.id, {
      newPassword: data.newPassword,
    });

    // reset forgot otp
    this.authTokenService.updateForgotOtp(user.id, {
      forgotOtp: "",
      forgotOtpExpireAt: "",
    });
  }
}
