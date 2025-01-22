import { Body, Controller, Get, Post, Render } from "@nestjs/common";
import { ApiBody, ApiOkResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import {
  GetSuccessResponse,
  SuccessResponse,
  UpdatedSuccessResponse,
} from "src/common/response/success.response";
import { ApiOkResponseDecorator } from "src/common/pagination/decorators/api-ok-response.decorator";
import { AUTH_SUCCESS_MESSAGES } from "../../messages/auth.success";
import ConfirmForgotPasswordRequestDto from "../dtos/services/confirm_otp_forgot_password_request.dto";
import TEMPLATE_EMAIL from "src/common/mail/common/template";
import { AuthUserService } from "../services/auth.service";
import {
  ForgotPasswordUserRequestDto,
  ForgotPasswordUserResponseDto,
  LoginUserRequestDto,
  LoginUserResponseDto,
  LogoutUserRequestDto,
  ResetPasswordUserRequestDto,
} from "../dtos";
import NewAccessTokenRequestDto from "../../dtos/new_access_token_request.dto";
import NewAccessTokenResponseDto from "../../dtos/new_access_token_response.dto";

@Controller("auth/user")
@ApiTags("Auth.User")
export class AuthUserController {
  constructor(private authService: AuthUserService) {}

  @Get("/test/template")
  @Render(TEMPLATE_EMAIL.OTP_FORGOT_PASSWORD)
  testTemplate() {
    return { email: "phamtrangiaan27@gmail.com", otp: "123456" };
  }

  @Post("/login")
  @ApiBody({
    type: LoginUserRequestDto,
  })
  @ApiOkResponseDecorator(LoginUserResponseDto)
  async login(
    @Body() payload: LoginUserRequestDto,
  ): Promise<GetSuccessResponse<LoginUserResponseDto>> {
    const data = await this.authService.login(payload);

    return new GetSuccessResponse(data);
  }

  @Post("/logout")
  @ApiBody({
    type: LogoutUserRequestDto,
  })
  @ApiOkResponse({
    type: SuccessResponse,
  })
  async logout(
    @Body() payload: LogoutUserRequestDto,
  ): Promise<SuccessResponse> {
    await this.authService.logout(payload);

    return new SuccessResponse(AUTH_SUCCESS_MESSAGES.LOGOUT_SUCCESS);
  }

  @Post("/refreshToken")
  @ApiBody({
    type: NewAccessTokenRequestDto,
  })
  @ApiOkResponseDecorator(NewAccessTokenResponseDto)
  async refreshToken(@Body() payload: NewAccessTokenRequestDto) {
    return await this.authService.getNewAccessToken(payload);
  }

  @Post("/fotgot-password")
  @ApiBody({
    type: ForgotPasswordUserRequestDto,
  })
  @ApiOkResponseDecorator(ForgotPasswordUserResponseDto)
  async forgotPassword(@Body() payload: ForgotPasswordUserRequestDto) {
    return await this.authService.forgotPassword(payload);
  }

  @Post("/confirm-otp-forgot-password")
  @ApiBody({
    type: ConfirmForgotPasswordRequestDto,
  })
  @ApiResponse({
    type: SuccessResponse,
  })
  async confirmOtpForgotPassword(
    @Body() payload: ConfirmForgotPasswordRequestDto,
  ): Promise<SuccessResponse> {
    await this.authService.confirmOtpForgotPassword(payload);

    return new SuccessResponse();
  }

  @Post("/reset-password")
  @ApiBody({
    type: ResetPasswordUserRequestDto,
  })
  @ApiResponse({
    status: 201,
    example: new UpdatedSuccessResponse(),
  })
  async resetPassword(
    @Body() payload: ResetPasswordUserRequestDto,
  ): Promise<SuccessResponse> {
    await this.authService.resetPassword(payload);

    return new UpdatedSuccessResponse();
  }
}
