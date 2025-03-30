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
import { GroupRoleService } from "../services/group_role.service";
import {
  CreateGroupRoleRequestDto,
  GetGroupRoleResponeDto,
  UpdateGroupRoleRequestDto,
} from "../dtos";
import { SearchAdminsRequestDto } from "~/modules/admin/dtos";
import { ApiOkResponseDecorator } from "~/common/pagination/decorators/api-ok-response.decorator";
import { PaginationSearchRequestDto } from "~/common/pagination/dtos";

@ApiBearerAuth()
@Controller("group-roles")
@ApiTags("Group.Role")
export class GroupRoleController {
  constructor(private readonly groupRoleService: GroupRoleService) {}

  // Get all group roles
  @Get()
  @Permissions([ENUM_PERMISSION.GROUP_ROLE_VIEW])
  @UseGuards(PermissionGuard)
  @ApiOkResponsePaginateDecorator(GetGroupRoleResponeDto)
  async getGroupRoles(
    @Query(PaginationRequestPipe) query: PaginationSearchRequestDto,
  ): Promise<GetSuccessWithPaginationResponse<GetGroupRoleResponeDto>> {
    const { data, pagination } =
      await this.groupRoleService.getGroupRoles(query);
    return new GetSuccessWithPaginationResponse<GetGroupRoleResponeDto>(
      data,
      pagination,
    );
  }

  // Get group role by id
  @Get("/:group_role_id")
  @Permissions([ENUM_PERMISSION.GROUP_ROLE_VIEW])
  @UseGuards(PermissionGuard)
  @ApiOkResponseDecorator(GetGroupRoleResponeDto)
  async getGroupRole(
    @Param("group_role_id") groupRoleId: string,
  ): Promise<GetSuccessResponse<GetGroupRoleResponeDto>> {
    const result = await this.groupRoleService.getGroupRole(groupRoleId);

    return new GetSuccessResponse<GetGroupRoleResponeDto>(result);
  }

  // Create group role
  @Post()
  @ApiResponse({
    status: 201,
    example: new CreateSuccessResponse(),
  })
  @Permissions([ENUM_PERMISSION.GROUP_ROLE_CREATE])
  @UseGuards(PermissionGuard)
  async createGroupRole(
    @Body() payload: CreateGroupRoleRequestDto,
  ): Promise<CreateSuccessResponse> {
    await this.groupRoleService.createGroupRole(payload);
    return new CreateSuccessResponse();
  }

  // Update group role
  @Patch("/:group_role_id")
  @ApiResponse({
    status: 201,
    example: new UpdatedSuccessResponse(),
  })
  @Permissions([ENUM_PERMISSION.GROUP_ROLE_UPDATE])
  @UseGuards(PermissionGuard)
  async updateGroupRole(
    @Param("group_role_id") id: string,
    @Body() payload: UpdateGroupRoleRequestDto,
  ): Promise<UpdatedSuccessResponse> {
    await this.groupRoleService.updateGroupRole(id, payload);
    return new UpdatedSuccessResponse();
  }

  // Delete group role
  @Delete("/:group_role_id")
  @Permissions([ENUM_PERMISSION.GROUP_ROLE_DELETE])
  @UseGuards(PermissionGuard)
  @ApiResponse({
    status: 201,
    example: new DeletedSuccessResponse(),
  })
  async deleteGroupRole(
    @Param("group_role_id") id: string,
  ): Promise<DeletedSuccessResponse> {
    await this.groupRoleService.deleteGroupRole(id);

    return new DeletedSuccessResponse();
  }
}
