import { Body, Controller, Get, Post, Render } from "@nestjs/common";
import { ApiBody, ApiOkResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import {
  ForgotPasswordAdminRequestDto,
  ForgotPasswordAdminResponseDto,
  LoginAdminRequestDto,
  LoginAdminResponseDto,
  LogoutAdminRequestDto,
  ResetPasswordAdminRequestDto,
} from "../dtos";
import {
  GetSuccessResponse,
  SuccessResponse,
  UpdatedSuccessResponse,
} from "~/common/response/success.response";
import { ApiOkResponseDecorator } from "~/common/pagination/decorators/api-ok-response.decorator";
import { AUTH_SUCCESS_MESSAGES } from "../../messages/auth.success";
import ConfirmForgotPasswordRequestDto from "../dtos/services/confirm_otp_forgot_password_request.dto";
import TEMPLATE_EMAIL from "~/common/mail/common/template";
import { AuthAdminService } from "../services/auth.service";
import NewAccessTokenRequestDto from "../../dtos/new_access_token_request.dto";
import NewAccessTokenResponseDto from "../../dtos/new_access_token_response.dto";

@Controller("auth/admin")
@ApiTags("Admin.Auth")
export class AuthAdminController {
  constructor(private authService: AuthAdminService) {}

  @Get("/test/template")
  @Render(TEMPLATE_EMAIL.OTP_FORGOT_PASSWORD)
  testTemplate() {
    return { email: "phamtrangiaan27@gmail.com", otp: "123456" };
  }

  @Post("/login")
  @ApiBody({
    type: LoginAdminRequestDto,
  })
  @ApiOkResponseDecorator(LoginAdminResponseDto)
  async login(
    @Body() payload: LoginAdminRequestDto,
  ): Promise<GetSuccessResponse<LoginAdminResponseDto>> {
    const data = await this.authService.login(payload);

    return new GetSuccessResponse(data);
  }

  @Post("/logout")
  @ApiBody({
    type: LogoutAdminRequestDto,
  })
  @ApiOkResponse({
    type: SuccessResponse,
  })
  async logout(
    @Body() payload: LogoutAdminRequestDto,
  ): Promise<SuccessResponse> {
    await this.authService.logout(payload);

    return new SuccessResponse(AUTH_SUCCESS_MESSAGES.LOGOUT_SUCCESS);
  }

  @Post("/refresh-token")
  @ApiBody({
    type: NewAccessTokenRequestDto,
  })
  @ApiOkResponseDecorator(NewAccessTokenResponseDto)
  async refreshToken(@Body() payload: NewAccessTokenRequestDto) {
    return await this.authService.getNewAccessToken(payload);
  }

  @Post("/fotgot-password")
  @ApiBody({
    type: ForgotPasswordAdminRequestDto,
  })
  @ApiOkResponseDecorator(ForgotPasswordAdminResponseDto)
  async forgotPassword(@Body() payload: ForgotPasswordAdminRequestDto) {
    return await this.authService.forgotPassword(payload);
  }

  @Post("/confirm-forgot-password-otp")
  @ApiBody({
    type: ConfirmForgotPasswordRequestDto,
  })
  @ApiResponse({
    type: SuccessResponse,
  })
  async confirmForgotPasswordOtp(
    @Body() payload: ConfirmForgotPasswordRequestDto,
  ): Promise<SuccessResponse> {
    await this.authService.confirmOtpForgotPassword(payload);

    return new SuccessResponse();
  }

  @Post("/reset-password")
  @ApiBody({
    type: ResetPasswordAdminRequestDto,
  })
  @ApiResponse({
    status: 201,
    example: new UpdatedSuccessResponse(),
  })
  async resetPassword(
    @Body() payload: ResetPasswordAdminRequestDto,
  ): Promise<SuccessResponse> {
    await this.authService.resetPassword(payload);

    return new UpdatedSuccessResponse();
  }
}
