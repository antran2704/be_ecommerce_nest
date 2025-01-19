import { Body, Controller, Get, Post, Render } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { ApiBody, ApiOkResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import {
  ForgotPasswordRequestDto,
  ForgotPasswordResponseDto,
  LoginRequestDto,
  LoginResponseDto,
  LogoutRequestDto,
  NewAccessTokenRequestDto,
  NewAccessTokenResponseDto,
  ResetPasswordRequestDto,
} from "../dtos";
import {
  GetSuccessResponse,
  SuccessResponse,
  UpdatedSuccessResponse,
} from "src/common/response/success.response";
import { ApiOkResponseDecorator } from "src/common/pagination/decorators/api-ok-response.decorator";
import { AUTH_SUCCESS_MESSAGES } from "../messages/auth.success";
import ConfirmForgotForgotPasswordRequestDto from "../dtos/services/confirm_otp_forgot_password_request.dto";

@Controller("auth")
@ApiTags("Auth.Admin")
export class AuthController {
  constructor(private authService: AuthService) {}

  // @Get("/test/template")
  // @Render('pages/signup')
  // testTemplate() {}

  @Post("/login")
  @ApiBody({
    type: LoginRequestDto,
  })
  @ApiOkResponseDecorator(LoginResponseDto)
  async login(
    @Body() payload: LoginRequestDto,
  ): Promise<GetSuccessResponse<LoginResponseDto>> {
    const data = await this.authService.login(payload);

    return new GetSuccessResponse(data);
  }

  @Post("/logout")
  @ApiBody({
    type: LogoutRequestDto,
  })
  @ApiOkResponse({
    type: SuccessResponse,
  })
  async logout(@Body() payload: LogoutRequestDto): Promise<SuccessResponse> {
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
    type: ForgotPasswordRequestDto,
  })
  @ApiOkResponseDecorator(ForgotPasswordResponseDto)
  async forgotPassword(@Body() payload: ForgotPasswordRequestDto) {
    return await this.authService.forgotPassword(payload);
  }

  @Post("/confirm-otp-forgot-password")
  @ApiBody({
    type: ConfirmForgotForgotPasswordRequestDto,
  })
  @ApiResponse({
    type: SuccessResponse,
  })
  async confirmOtpForgotPassword(
    @Body() payload: ConfirmForgotForgotPasswordRequestDto,
  ): Promise<SuccessResponse> {
    await this.authService.confirmOtpForgotPassword(payload);

    return new SuccessResponse();
  }

  @Post("/reset-password")
  @ApiBody({
    type: ResetPasswordRequestDto,
  })
  @ApiResponse({
    status: 201,
    example: new UpdatedSuccessResponse(),
  })
  async resetPassword(
    @Body() payload: ResetPasswordRequestDto,
  ): Promise<SuccessResponse> {
    await this.authService.resetPassword(payload);

    return new UpdatedSuccessResponse();
  }
}
