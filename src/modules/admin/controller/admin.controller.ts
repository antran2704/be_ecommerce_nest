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
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";

import { AdminService } from "../services/admin.service";
import {
  CreateSuccessResponse,
  DeletedSuccessResponse,
  GetSuccessResponse,
  GetSuccessWithPaginationResponse,
  UpdatedSuccessResponse,
} from "~/common/response/success.response";
import { ApiOkResponsePaginateDecorator } from "~/common/pagination/decorators/api-ok-response-paginate.decorator";
import { PaginationRequestPipe } from "~/common/request/pipes/pagination_request.pipe";
import { Permissions } from "~/common/auth/decorators/permission.decorator";
import { ENUM_PERMISSION } from "~/modules/permissions/enums/permission.enum";
import { PermissionGuard } from "~/common/auth/guards";
import {
  CreateAdminRequestDto,
  CreateSuperAdminRequestDto,
  GetAdminListResponseDto,
  GetAdminResponseDto,
  ResetPasswordRequestDto,
  SearchAdminsRequestDto,
  UpdateAdminRequestDto,
} from "../dtos";
import { ApiOkResponseDecorator } from "~/common/pagination/decorators/api-ok-response.decorator";

@ApiBearerAuth()
@Controller("admins")
@ApiTags("Admin.ManageAdmins")
export class AdminController {
  constructor(private readonly userService: AdminService) {}

  // get all admins
  @Get()
  @Permissions([ENUM_PERMISSION.STAFF_VIEW])
  @UseGuards(PermissionGuard)
  @ApiOkResponsePaginateDecorator(GetAdminListResponseDto)
  async getUsers(
    @Query(PaginationRequestPipe) query: SearchAdminsRequestDto,
  ): Promise<GetSuccessWithPaginationResponse<GetAdminListResponseDto>> {
    const { data, pagination } = await this.userService.getAdmins(query);

    return new GetSuccessWithPaginationResponse(data, pagination);
  }

  // get an admin
  @Get("/:user_id")
  @Permissions([ENUM_PERMISSION.STAFF_VIEW])
  @UseGuards(PermissionGuard)
  @ApiOkResponseDecorator(GetAdminResponseDto)
  async getUser(
    @Param("user_id") userId: string,
  ): Promise<GetSuccessResponse<GetAdminResponseDto>> {
    const data = await this.userService.getAdminById(userId);

    return new GetSuccessResponse(data);
  }

  // create admin
  @Post()
  @ApiResponse({
    status: 201,
    example: new CreateSuccessResponse(),
  })
  @Permissions([ENUM_PERMISSION.STAFF_CREATE])
  @UseGuards(PermissionGuard)
  async createAdmin(
    @Body() payload: CreateAdminRequestDto,
  ): Promise<CreateSuccessResponse> {
    await this.userService.createUser(payload);
    return new CreateSuccessResponse();
  }

  // create super admin
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

  // update admin
  @Patch("/:user_id")
  @ApiResponse({
    status: 201,
    example: new UpdatedSuccessResponse(),
  })
  @Permissions([ENUM_PERMISSION.STAFF_UPDATE])
  @UseGuards(PermissionGuard)
  async updateAdmin(
    @Param("user_id") userId: string,
    @Body() payload: UpdateAdminRequestDto,
  ) {
    await this.userService.updateAdmin(userId, payload);

    return new UpdatedSuccessResponse();
  }

  // reset password
  @Patch("/:user_id/reset-password")
  @ApiResponse({
    status: 201,
    example: new UpdatedSuccessResponse(),
  })
  @Permissions([ENUM_PERMISSION.STAFF_UPDATE])
  @UseGuards(PermissionGuard)
  async resetPassword(
    @Param("user_id") userId: string,
    @Body() payload: ResetPasswordRequestDto,
  ): Promise<UpdatedSuccessResponse> {
    await this.userService.resetPassword(userId, payload);
    return new UpdatedSuccessResponse();
  }

  // enable admin
  @Patch("/:user_id/enable")
  @ApiResponse({
    status: 201,
    example: new UpdatedSuccessResponse(),
  })
  @Permissions([ENUM_PERMISSION.STAFF_UPDATE])
  @UseGuards(PermissionGuard)
  async enable(
    @Param("user_id") userId: string,
  ): Promise<UpdatedSuccessResponse> {
    await this.userService.enableAdmin(userId);
    return new UpdatedSuccessResponse();
  }

  // disable admin
  @Patch("/:user_id/disable")
  @ApiResponse({
    status: 201,
    example: new UpdatedSuccessResponse(),
  })
  @Permissions([ENUM_PERMISSION.STAFF_UPDATE])
  @UseGuards(PermissionGuard)
  async disable(
    @Param("user_id") userId: string,
  ): Promise<UpdatedSuccessResponse> {
    await this.userService.disableAdmin(userId);
    return new UpdatedSuccessResponse();
  }

  // delete admin
  @Delete("/:user_id")
  @Permissions([ENUM_PERMISSION.STAFF_DELETE])
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
