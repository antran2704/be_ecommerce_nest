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
import { ApiOkResponseDecorator } from "src/common/pagination/decorators/api-ok-response.decorator";
import { RoleService } from "../services/role.service";
import {
  CreateRoleRequestDto,
  GetRoleResponeDto,
  SearchRolesRequestDto,
  UpdateRoleRequestDto,
} from "../dtos";

@ApiBearerAuth()
@Controller("roles")
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  // Get all roles
  @Get()
  @Permissions([ENUM_PERMISSION.ROLE_VIEW])
  @UseGuards(PermissionGuard)
  @ApiOkResponsePaginateDecorator(GetRoleResponeDto)
  async getRoles(
    @Query(PaginationRequestPipe) query: SearchRolesRequestDto,
  ): Promise<GetSuccessWithPaginationResponse<GetRoleResponeDto>> {
    const { data, pagination } = await this.roleService.getRoles(query);
    return new GetSuccessWithPaginationResponse<GetRoleResponeDto>(
      data,
      pagination,
    );
  }

  // Get role by id
  @Get("/:role_id")
  @Permissions([ENUM_PERMISSION.ROLE_VIEW])
  @UseGuards(PermissionGuard)
  @ApiOkResponseDecorator(GetRoleResponeDto)
  async getRole(
    @Param("role_id") roleId: string,
  ): Promise<GetSuccessResponse<GetRoleResponeDto>> {
    const result = await this.roleService.getRole(roleId);

    return new GetSuccessResponse<GetRoleResponeDto>(result);
  }

  // Create group role
  @Post()
  @ApiResponse({
    status: 201,
    example: new CreateSuccessResponse(),
  })
  @Permissions([ENUM_PERMISSION.ROLE_CREATE])
  @UseGuards(PermissionGuard)
  async createRole(
    @Body() payload: CreateRoleRequestDto,
  ): Promise<CreateSuccessResponse> {
    await this.roleService.createRole(payload);
    return new CreateSuccessResponse();
  }

  // Update role
  @Patch("/:role_id")
  @ApiResponse({
    status: 201,
    example: new UpdatedSuccessResponse(),
  })
  @Permissions([ENUM_PERMISSION.ROLE_UPDATE])
  @UseGuards(PermissionGuard)
  async updateRole(
    @Param("role_id") id: string,
    @Body() payload: UpdateRoleRequestDto,
  ): Promise<UpdatedSuccessResponse> {
    await this.roleService.updateRole(id, payload);
    return new UpdatedSuccessResponse();
  }

  // Delete role
  @Delete("/:role_id")
  @Permissions([ENUM_PERMISSION.ROLE_DELETE])
  @UseGuards(PermissionGuard)
  @ApiResponse({
    status: 201,
    example: new DeletedSuccessResponse(),
  })
  async deleteRole(
    @Param("role_id") id: string,
  ): Promise<DeletedSuccessResponse> {
    await this.roleService.deleteRole(id);

    return new DeletedSuccessResponse();
  }
}
