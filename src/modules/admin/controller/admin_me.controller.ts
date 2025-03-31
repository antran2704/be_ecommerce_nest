import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import { AdminService } from "../services/admin.service";
import { UpdatedSuccessResponse } from "~/common/response/success.response";
import { JwtAuthGuard } from "~/common/auth/guards";
import {
  ChangePasswordAdminRequestDto,
  GetAdminPermissionResponseDto,
  GetAdminResponseDto,
  UpdateAdminMeRequestDto,
} from "../dtos";
import { ApiOkResponseDecorator } from "~/common/pagination/decorators/api-ok-response.decorator";
import { ApiMulterRequestDecorator } from "~/common/pagination/decorators/api-multer-request.decorator";
import { FileRequiredPipe } from "~/common/request/pipes/file_request.pipe";
import { FileUploadInterceptor } from "~/common/multer/file-upload.interceptor";
import { getImagePath } from "~/common/multer/helpers";

@ApiBearerAuth()
@Controller("admin/me")
@ApiTags("Admin.Me")
export class AdminMeController {
  constructor(private readonly userService: AdminService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponseDecorator(GetAdminResponseDto)
  async getMe(@Request() req: any): Promise<GetAdminResponseDto> {
    const data = await this.userService.getAdminById(req.user.userId);

    return data;
  }

  @Get("/permissions")
  @ApiOkResponseDecorator(GetAdminPermissionResponseDto)
  @UseGuards(JwtAuthGuard)
  async getPermissions(
    @Request() req: any,
  ): Promise<GetAdminPermissionResponseDto> {
    const data = await this.userService.getAdminPermissions(req.user.userId);

    return data;
  }

  @Patch()
  @ApiResponse({
    status: 201,
    example: new UpdatedSuccessResponse(),
  })
  @UseGuards(JwtAuthGuard)
  async updateMe(
    @Request() req: any,
    @Body() payload: UpdateAdminMeRequestDto,
  ): Promise<UpdatedSuccessResponse> {
    await this.userService.updateAdminMe(req.user.userId, payload);
    return new UpdatedSuccessResponse();
  }

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
    await this.userService.changePassword(req.user.userId, payload);
    return new UpdatedSuccessResponse();
  }

  @Post("/upload-avatar")
  @ApiConsumes("multipart/form-data")
  @ApiMulterRequestDecorator()
  @UseInterceptors(FileUploadInterceptor("/admins"))
  @UseGuards(JwtAuthGuard)
  async createImage(
    @UploadedFile(FileRequiredPipe) file: Express.Multer.File,
  ): Promise<string> {
    return getImagePath(file.path);
  }
}
