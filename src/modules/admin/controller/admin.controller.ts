import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiResponse } from "@nestjs/swagger";

import { AdminService } from "../services/admin.service";
import {
  CreateSuccessResponse,
  DeletedSuccessResponse,
  GetSuccessResponse,
  GetSuccessWithPaginationResponse,
  UpdatedSuccessResponse,
} from "src/common/response/success.response";
import { ApiOkResponsePaginateDecorator } from "src/common/pagination/decorators/api-ok-response-paginate.decorator";
import { PaginationRequestPipe } from "src/common/request/pipes/pagination_request.pipe";
import { Permissions } from "src/common/auth/decorators/permission.decorator";
import { ENUM_PERMISSION } from "src/modules/permissions/enums/permission.enum";
import { PermissionGuard } from "src/common/auth/guards";
import {
  ChangePasswordAdminRequestDto,
  CreateAdminRequestDto,
  CreateSuperAdminRequestDto,
  GetAdminResponseDto,
  SearchAdminsRequestDto,
  UpdateAdminRequestDto,
} from "../dtos";
import { ApiOkResponseDecorator } from "src/common/pagination/decorators/api-ok-response.decorator";

@ApiBearerAuth()
@Controller("admins")
export class AdminController {
  constructor(private readonly userService: AdminService) {}

  @Get()
  @Permissions([ENUM_PERMISSION.ADMIN_VIEW])
  @UseGuards(PermissionGuard)
  @ApiOkResponsePaginateDecorator(GetAdminResponseDto)
  async getUsers(
    @Query(PaginationRequestPipe) query: SearchAdminsRequestDto,
  ): Promise<GetSuccessWithPaginationResponse<GetAdminResponseDto>> {
    const { data, pagination } = await this.userService.getAdmins(query);

    return new GetSuccessWithPaginationResponse(data, pagination);
  }

  @Get("/:user_id")
  @Permissions([ENUM_PERMISSION.ADMIN_VIEW])
  @UseGuards(PermissionGuard)
  @ApiOkResponseDecorator(GetAdminResponseDto)
  async getUser(
    @Param("user_id") userId: string,
  ): Promise<GetSuccessResponse<GetAdminResponseDto>> {
    const data = await this.userService.getAdmin(userId);

    return new GetSuccessResponse(data);
  }

  @Post()
  @ApiResponse({
    status: 201,
    example: new CreateSuccessResponse(),
  })
  @Permissions([ENUM_PERMISSION.ADMIN_CREATE])
  @UseGuards(PermissionGuard)
  async createAdmin(
    @Body() payload: CreateAdminRequestDto,
  ): Promise<CreateSuccessResponse> {
    await this.userService.createUser(payload);
    return new CreateSuccessResponse();
  }

  @Post("/super-admin")
  @ApiResponse({
    status: 201,
    example: new CreateSuccessResponse(),
  })
  async createSuperAdmin(
    @Body() payload: CreateSuperAdminRequestDto,
  ): Promise<CreateSuccessResponse> {
    await this.userService.createSuperUser(payload);
    return new CreateSuccessResponse();
  }

  @Patch("/:user_id")
  @ApiResponse({
    status: 201,
    example: new UpdatedSuccessResponse(),
  })
  @Permissions([ENUM_PERMISSION.ADMIN_UPDATE])
  @UseGuards(PermissionGuard)
  async updateAdmin(
    @Param("user_id") userId: string,
    @Body() payload: UpdateAdminRequestDto,
  ) {
    return await this.userService.updateAdmin(userId, payload);
  }

  @Patch("/:user_id/change-password")
  @ApiResponse({
    status: 201,
    example: new UpdatedSuccessResponse(),
  })
  @Permissions([ENUM_PERMISSION.ADMIN_UPDATE])
  @UseGuards(PermissionGuard)
  async changePassword(
    @Param("user_id") userId: string,
    @Body() payload: ChangePasswordAdminRequestDto,
  ): Promise<UpdatedSuccessResponse> {
    await this.userService.changePassword(userId, payload);
    return new UpdatedSuccessResponse();
  }

  @Patch("/:user_id/enable")
  @ApiResponse({
    status: 201,
    example: new UpdatedSuccessResponse(),
  })
  @Permissions([ENUM_PERMISSION.ADMIN_UPDATE])
  @UseGuards(PermissionGuard)
  async enable(
    @Param("user_id") userId: string,
  ): Promise<UpdatedSuccessResponse> {
    await this.userService.enableAdmin(userId);
    return new UpdatedSuccessResponse();
  }

  @Patch("/:user_id/disable")
  @ApiResponse({
    status: 201,
    example: new UpdatedSuccessResponse(),
  })
  @Permissions([ENUM_PERMISSION.ADMIN_UPDATE])
  @UseGuards(PermissionGuard)
  async disable(
    @Param("user_id") userId: string,
  ): Promise<UpdatedSuccessResponse> {
    await this.userService.disableAdmin(userId);
    return new UpdatedSuccessResponse();
  }

  @Delete("/:user_id")
  @Permissions([ENUM_PERMISSION.ADMIN_DELETE])
  @UseGuards(PermissionGuard)
  @ApiResponse({
    status: 201,
    example: new DeletedSuccessResponse(),
  })
  async deleteAdmin(
    @Param("user_id") userId: string,
  ): Promise<DeletedSuccessResponse> {
    await this.userService.deleteAdmin(userId);
    return new DeletedSuccessResponse();
  }
}
