import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Request,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";

import { AdminService } from "../services/admin.service";
import {
  GetSuccessResponse,
  UpdatedSuccessResponse,
} from "src/common/response/success.response";
import { JwtAuthGuard } from "src/common/auth/guards";
import {
  ChangePasswordAdminRequestDto,
  GetAdminPermissionResponseDto,
  GetAdminResponseDto,
} from "../dtos";
import { ApiOkResponseDecorator } from "src/common/pagination/decorators/api-ok-response.decorator";

@ApiBearerAuth()
@Controller("admins/me")
@ApiTags("Admin.Me")
export class AdminMeController {
  constructor(private readonly userService: AdminService) {}

  // get an admin
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponseDecorator(GetAdminResponseDto)
  async getMe(
    @Request() req: any,
  ): Promise<GetSuccessResponse<GetAdminResponseDto>> {
    const data = await this.userService.getAdminById(req.user.id);

    return new GetSuccessResponse(data);
  }

  // get permission of admin
  @Get("/permissions")
  @ApiOkResponseDecorator(GetAdminPermissionResponseDto)
  @UseGuards(JwtAuthGuard)
  async getPermissions(
    @Request() req: any,
  ): Promise<GetSuccessResponse<GetAdminPermissionResponseDto>> {
    const data = await this.userService.getAdminPermissions(req.user.id);

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
    @Body() payload: ChangePasswordAdminRequestDto,
  ): Promise<UpdatedSuccessResponse> {
    await this.userService.changePassword(req.user.id, payload);
    return new UpdatedSuccessResponse();
  }
}
