import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { ApiBody, ApiResponse } from "@nestjs/swagger";
import {
  LoginRequestDto,
  LoginResponseDto,
  NewAccessTokenRequestDto,
  NewAccessTokenResponseDto,
} from "../dtos";
import { GetSuccessResponse } from "src/common/response/success.response";
import { ApiOkResponseDecorator } from "src/common/pagination/decorators/api-ok-response.decorator";

@Controller("auth")
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

  @Post("/refreshToken")
  @ApiBody({
    type: NewAccessTokenRequestDto,
  })
  @ApiOkResponseDecorator(NewAccessTokenResponseDto)
  async refreshToken(@Body() payload: NewAccessTokenRequestDto) {
    return await this.authService.getNewAccessToken(payload);
  }
}
