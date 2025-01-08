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
import { CreateAdminDto } from "../dtos/create_admin.dto";
import { CreateSuperAdminDto } from "../dtos/create_super_admin.dto";
import {
  CreateSuccessResponse,
  UpdatedSuccessResponse,
} from "src/common/response/success.response";
import { GetAdminReponseDto } from "../dtos/get_admin_response.dto";
import { ApiOkResponsePaginateDecorator } from "src/common/pagination/decorators/api-ok-response-paginate.decorator";
import { PaginationRequestPipe } from "src/common/request/pipes/pagination_request.pipe";
import PaginationSearchRequestDto from "src/common/pagination/dtos/pagination_search_request.dto";
import { Permissions } from "src/common/auth/decorators/permission.decorator";
import { ENUM_PERMISSION } from "src/modules/permissions/enums/permission.enum";
import { PermissionGuard } from "src/common/auth/guards";
import { UpdateAdminRequestDto } from "../dtos/update_admin_request.dto";

@ApiBearerAuth()
@Controller({
  version: "1",
  path: "admins",
})
export class AdminController {
  constructor(private readonly userService: AdminService) {}

  @Get()
  @Permissions([ENUM_PERMISSION.ADMIN_VIEW])
  @UseGuards(PermissionGuard)
  @ApiOkResponsePaginateDecorator(GetAdminReponseDto)
  async getUsers(
    @Query(PaginationRequestPipe) query: PaginationSearchRequestDto,
  ) {
    return await this.userService.getAdmins(query);
  }

  @Post()
  @ApiResponse({
    status: 201,
    example: new CreateSuccessResponse(),
  })
  async createAdmin(@Body() payload: CreateAdminDto) {
    return await this.userService.createUser(payload);
  }

  @Post("/super-admin")
  @ApiResponse({
    status: 201,
    example: new CreateSuccessResponse(),
  })
  async createSuperAdmin(@Body() payload: CreateSuperAdminDto) {
    return await this.userService.createSuperUser(payload);
  }

  @Patch("/:user_id")
  @ApiResponse({
    status: 201,
    example: new UpdatedSuccessResponse(),
  })
  async updateAdmin(
    @Param("user_id") userId: string,
    @Body() payload: UpdateAdminRequestDto,
  ) {
    return await this.userService.updateAdmin(userId, payload);
  }

  @Delete("/:user_id")
  async deleteAdmin(@Param("user_id") userId: string) {
    return await this.userService.deleteAdmin(userId);
  }
}
