import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import { UserService } from "../services/user.service";
import {
  CreateSuccessResponse,
  DeletedSuccessResponse,
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
  GetListUserResponseDto,
  GetUserResponseDto,
  IsExitUserRequestDto,
  SearchUserRequestDto,
  UpdateUserRequestDto,
} from "../dtos";
import { ResetPasswordRequestDto } from "~/modules/admin/dtos";
import { ApiMulterRequestDecorator } from "~/common/pagination/decorators/api-multer-request.decorator";
import { FileUploadInterceptor } from "~/common/multer/file-upload.interceptor";
import { FileRequiredPipe } from "~/common/request/pipes/file_request.pipe";
import { getFilePath } from "~/common/multer/helpers";

@ApiBearerAuth()
@Controller("users")
@ApiTags("Admin.ManageUsers")
export class UserController {
  constructor(private readonly userService: UserService) {}

  // get all users
  @Get()
  @Permissions([ENUM_PERMISSION.ADMIN_USER_VIEW])
  @UseGuards(PermissionGuard)
  @ApiOkResponsePaginateDecorator(GetListUserResponseDto)
  async getUsers(
    @Query(PaginationRequestPipe) query: SearchUserRequestDto,
  ): Promise<GetSuccessWithPaginationResponse<GetListUserResponseDto>> {
    const { data, pagination } = await this.userService.getUsers(query);

    return new GetSuccessWithPaginationResponse(data, pagination);
  }

  // get an user
  @Get("/:user_id")
  @Permissions([ENUM_PERMISSION.ADMIN_USER_VIEW])
  // @UseGuards(PermissionGuard)
  @ApiOkResponseDecorator(GetUserResponseDto)
  async getUser(@Param("user_id") userId: string): Promise<GetUserResponseDto> {
    const data = await this.userService.getUserById(userId);

    return data;
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
    await this.userService.createUserByAdmin(payload);
    return new CreateSuccessResponse();
  }

  @Post("is-exit-user")
  @Permissions([ENUM_PERMISSION.ADMIN_STAFF_VIEW])
  @UseGuards(PermissionGuard)
  @ApiOkResponse({
    example: true,
  })
  async isExitUser(@Body() payload: IsExitUserRequestDto): Promise<boolean> {
    const data = await this.userService.isExitUser(payload);

    return data;
  }

  @Post("/upload-avatar")
  @ApiConsumes("multipart/form-data")
  @ApiMulterRequestDecorator()
  @UseInterceptors(FileUploadInterceptor("/user"))
  @Permissions([ENUM_PERMISSION.ADMIN_USER_CREATE])
  async createImage(
    @UploadedFile(FileRequiredPipe) file: Express.Multer.File,
  ): Promise<string> {
    return getFilePath(file.path);
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

  // unban user
  @Patch("/:user_id/unban")
  @ApiResponse({
    status: 201,
    example: new UpdatedSuccessResponse(),
  })
  @Permissions([ENUM_PERMISSION.ADMIN_USER_UPDATE])
  @UseGuards(PermissionGuard)
  async unBanUser(
    @Param("user_id") userId: string,
  ): Promise<UpdatedSuccessResponse> {
    await this.userService.unBanUser(userId);
    return new UpdatedSuccessResponse();
  }

  // disable user
  @Patch("/:user_id/ban")
  @ApiResponse({
    status: 201,
    example: new UpdatedSuccessResponse(),
  })
  @Permissions([ENUM_PERMISSION.ADMIN_USER_UPDATE])
  @UseGuards(PermissionGuard)
  async banUser(
    @Param("user_id") userId: string,
  ): Promise<UpdatedSuccessResponse> {
    await this.userService.banUser(userId);
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
    await this.userService.inactiveUser(userId);
    return new UpdatedSuccessResponse();
  }

  // active user
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
    await this.userService.activeUser(userId);
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
