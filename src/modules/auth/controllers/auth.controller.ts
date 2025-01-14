import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { ApiBody, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import {
  LoginRequestDto,
  LoginResponseDto,
  LogoutRequestDto,
  NewAccessTokenRequestDto,
  NewAccessTokenResponseDto,
} from "../dtos";
import {
  GetSuccessResponse,
  SuccessResponse,
} from "src/common/response/success.response";
import { ApiOkResponseDecorator } from "src/common/pagination/decorators/api-ok-response.decorator";
import { AUTH_SUCCESS_MESSAGES } from "../messages/auth.success";

@Controller("auth")
@ApiTags("Auth.Admin")
export class AuthController {
  constructor(private authService: AuthService) {}

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
}
