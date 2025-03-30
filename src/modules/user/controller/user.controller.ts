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

import { UserService } from "../services/user.service";
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

import { ApiOkResponseDecorator } from "~/common/pagination/decorators/api-ok-response.decorator";
import {
  CreateUserRequestDto,
  GetUserResponseDto,
  SearchUserRequestDto,
  UpdateUserRequestDto,
} from "../dtos";
import { ResetPasswordRequestDto } from "~/modules/admin/dtos";

@ApiBearerAuth()
@Controller("users")
@ApiTags("Admin.ManageUsers")
export class UserController {
  constructor(private readonly userService: UserService) {}

  // get all users
  @Get()
  @Permissions([ENUM_PERMISSION.ADMIN_USER_VIEW])
  @UseGuards(PermissionGuard)
  @ApiOkResponsePaginateDecorator(GetUserResponseDto)
  async getUsers(
    @Query(PaginationRequestPipe) query: SearchUserRequestDto,
  ): Promise<GetSuccessWithPaginationResponse<GetUserResponseDto>> {
    const { data, pagination } = await this.userService.getUsers(query);

    return new GetSuccessWithPaginationResponse(data, pagination);
  }

  // get an user
  @Get("/:user_id")
  @Permissions([ENUM_PERMISSION.ADMIN_USER_VIEW])
  @UseGuards(PermissionGuard)
  @ApiOkResponseDecorator(GetUserResponseDto)
  async getUser(
    @Param("user_id") userId: string,
  ): Promise<GetSuccessResponse<GetUserResponseDto>> {
    const data = await this.userService.getUserById(userId);

    return new GetSuccessResponse(data);
  }

  // create user
  @Post()
  @ApiResponse({
    status: 201,
    example: new CreateSuccessResponse(),
  })
  @Permissions([ENUM_PERMISSION.ADMIN_USER_CREATE])
  @UseGuards(PermissionGuard)
  async createUser(
    @Body() payload: CreateUserRequestDto,
  ): Promise<CreateSuccessResponse> {
    await this.userService.createUserWithSystem(payload);
    return new CreateSuccessResponse();
  }

  // update user
  @Patch("/:user_id")
  @ApiResponse({
    status: 201,
    example: new UpdatedSuccessResponse(),
  })
  @Permissions([ENUM_PERMISSION.ADMIN_USER_UPDATE])
  @UseGuards(PermissionGuard)
  async updateAdmin(
    @Param("user_id") userId: string,
    @Body() payload: UpdateUserRequestDto,
  ) {
    return await this.userService.updateUser(userId, payload);
  }

  // reset password
  @Patch("/:user_id/reset-password")
  @ApiResponse({
    status: 201,
    example: new UpdatedSuccessResponse(),
  })
  @Permissions([ENUM_PERMISSION.ADMIN_USER_UPDATE])
  @UseGuards(PermissionGuard)
  async resetPassword(
    @Param("user_id") userId: string,
    @Body() payload: ResetPasswordRequestDto,
  ): Promise<UpdatedSuccessResponse> {
    await this.userService.resetPassword(userId, payload);
    return new UpdatedSuccessResponse();
  }

  // enable user
  @Patch("/:user_id/enable")
  @ApiResponse({
    status: 201,
    example: new UpdatedSuccessResponse(),
  })
  @Permissions([ENUM_PERMISSION.ADMIN_USER_UPDATE])
  @UseGuards(PermissionGuard)
  async enable(
    @Param("user_id") userId: string,
  ): Promise<UpdatedSuccessResponse> {
    await this.userService.enableUser(userId);
    return new UpdatedSuccessResponse();
  }

  // disable user
  @Patch("/:user_id/disable")
  @ApiResponse({
    status: 201,
    example: new UpdatedSuccessResponse(),
  })
  @Permissions([ENUM_PERMISSION.ADMIN_USER_UPDATE])
  @UseGuards(PermissionGuard)
  async disable(
    @Param("user_id") userId: string,
  ): Promise<UpdatedSuccessResponse> {
    await this.userService.disableUser(userId);
    return new UpdatedSuccessResponse();
  }

  // delete user
  @Delete("/:user_id")
  @Permissions([ENUM_PERMISSION.ADMIN_USER_DELETE])
  @UseGuards(PermissionGuard)
  @ApiResponse({
    status: 201,
    example: new DeletedSuccessResponse(),
  })
  async deleteUser(
    @Param("user_id") userId: string,
  ): Promise<DeletedSuccessResponse> {
    await this.userService.deleteUser(userId);
    return new DeletedSuccessResponse();
  }
}
