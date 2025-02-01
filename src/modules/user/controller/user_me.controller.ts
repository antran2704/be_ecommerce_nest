import {
  Body,
  Controller,
  Get,
  Patch,
  Request,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";

import { UserService } from "../services/user.service";
import {
  GetSuccessResponse,
  UpdatedSuccessResponse,
} from "src/common/response/success.response";
import { JwtAuthGuard } from "src/common/auth/guards";

import { ApiOkResponseDecorator } from "src/common/pagination/decorators/api-ok-response.decorator";
import { ChangePasswordUserRequestDto, GetUserResponseDto } from "../dtos";

@ApiBearerAuth()
@Controller("users/me")
@ApiTags("User.Me")
export class UserMeController {
  constructor(private readonly userService: UserService) {}

  // get an user
  @Get()
  @ApiOkResponseDecorator(GetUserResponseDto)
  @UseGuards(JwtAuthGuard)
  async getMe(
    @Request() req: any,
  ): Promise<GetSuccessResponse<GetUserResponseDto>> {
    const data = await this.userService.getUserById(req.user.id);
    return new GetSuccessResponse(data);
  }

  // change password
  @Patch("/change-password")
  @ApiResponse({
    status: 201,
    example: new UpdatedSuccessResponse(),
  })
  @UseGuards(JwtAuthGuard)
  async changePassword(
    @Request() req: any,
    @Body() payload: ChangePasswordUserRequestDto,
  ): Promise<UpdatedSuccessResponse> {
    await this.userService.changePassword(req.user.id, payload);
    return new UpdatedSuccessResponse();
  }
}
