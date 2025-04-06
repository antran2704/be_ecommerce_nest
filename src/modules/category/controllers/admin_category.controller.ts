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
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import { AdminCategoryService } from "../services/admin_category.service";
import { Permissions } from "~/common/auth/decorators/permission.decorator";
import { ENUM_PERMISSION } from "~/modules/permissions/enums/permission.enum";
import { PermissionGuard } from "~/common/auth/guards";
import { ApiOkResponsePaginateDecorator } from "~/common/pagination/decorators/api-ok-response-paginate.decorator";
import {
  AdminCreateCategoryRequestDto,
  AdminGetCategoriesRequestDto,
  AdminGetCategoriesResponseDto,
  AdminGetCategoryResponseDto,
  AdminGetChildCategoryResponseDto,
  AdminUpdateCategoryRequestDto,
} from "../dtos/services";
import { PaginationRequestPipe } from "~/common/request/pipes/pagination_request.pipe";
import {
  CreateSuccessResponse,
  DeletedSuccessResponse,
  GetSuccessResponse,
  GetSuccessWithPaginationResponse,
  UpdatedSuccessResponse,
} from "~/common/response/success.response";
import { ApiOkResponseDecorator } from "~/common/pagination/decorators/api-ok-response.decorator";
import { ApiMulterRequestDecorator } from "~/common/pagination/decorators/api-multer-request.decorator";
import { FileRequiredPipe } from "~/common/request/pipes/file_request.pipe";
import { getImagePath } from "~/common/multer/helpers";
import { FileUploadInterceptor } from "~/common/multer/file-upload.interceptor";
import { ApiListOkResponseDecorator } from "~/common/pagination/decorators/api-list-ok-response.decorator";

@ApiBearerAuth()
@Controller("admin/categories")
@ApiTags("Admin.Category")
export class AdminCategoryController {
  constructor(private readonly categoryService: AdminCategoryService) {}

  // get categories
  @Get()
  @Permissions([ENUM_PERMISSION.ADMIN_CATEGORY_VIEW])
  // @UseGuards(PermissionGuard)
  @ApiOkResponsePaginateDecorator(AdminGetCategoriesResponseDto)
  async getCategories(
    @Query(PaginationRequestPipe) query: AdminGetCategoriesRequestDto,
  ): Promise<GetSuccessWithPaginationResponse<AdminGetCategoriesResponseDto>> {
    const { data, pagination } =
      await this.categoryService.getCategories(query);

    return new GetSuccessWithPaginationResponse(data, pagination);
  }

  // get children of category
  @Get("/children/:category_id")
  @Permissions([ENUM_PERMISSION.ADMIN_CATEGORY_VIEW])
  @UseGuards(PermissionGuard)
  @ApiListOkResponseDecorator(AdminGetChildCategoryResponseDto)
  async getChildren(
    @Param("category_id") id: string,
  ): Promise<AdminGetChildCategoryResponseDto[]> {
    const data = await this.categoryService.getChildren(id);

    return data;
  }

  // get a category
  @Get("/:category_id")
  @Permissions([ENUM_PERMISSION.ADMIN_CATEGORY_VIEW])
  @UseGuards(PermissionGuard)
  @ApiOkResponseDecorator(AdminGetCategoryResponseDto)
  async getUser(
    @Param("category_id") id: string,
  ): Promise<AdminGetCategoryResponseDto> {
    const data = await this.categoryService.getCategoryById(id);

    return data;
  }

  // create category
  @Post()
  @ApiResponse({
    status: 201,
    example: new CreateSuccessResponse(),
  })
  @Permissions([ENUM_PERMISSION.ADMIN_CATEGORY_CREATE])
  @UseGuards(PermissionGuard)
  async createUser(
    @Body() payload: AdminCreateCategoryRequestDto,
  ): Promise<CreateSuccessResponse> {
    await this.categoryService.createCategory(payload);
    return new CreateSuccessResponse();
  }

  // create image
  @Post("/upload-thumbnail")
  @ApiConsumes("multipart/form-data")
  @ApiMulterRequestDecorator()
  @UseInterceptors(FileUploadInterceptor("/categories"))
  @Permissions([ENUM_PERMISSION.ADMIN_CATEGORY_CREATE])
  @UseGuards(PermissionGuard)
  async createImage(
    @UploadedFile(FileRequiredPipe) file: Express.Multer.File,
  ): Promise<string> {
    return getImagePath(file.path);
  }

  // update user
  @Patch("/:category_id")
  @ApiResponse({
    status: 201,
    example: new UpdatedSuccessResponse(),
  })
  @Permissions([ENUM_PERMISSION.ADMIN_CATEGORY_UPDATE])
  @UseGuards(PermissionGuard)
  async updateAdmin(
    @Param("category_id") id: string,
    @Body() payload: AdminUpdateCategoryRequestDto,
  ) {
    await this.categoryService.updateCategory(id, payload);

    return new UpdatedSuccessResponse();
  }

  // delete category
  @Delete("/:category_id")
  @Permissions([ENUM_PERMISSION.ADMIN_CATEGORY_DELETE])
  @UseGuards(PermissionGuard)
  @ApiResponse({
    status: 201,
    example: new DeletedSuccessResponse(),
  })
  async deleteUser(
    @Param("category_id") id: string,
  ): Promise<DeletedSuccessResponse> {
    await this.categoryService.deleteCategory(id);
    return new DeletedSuccessResponse();
  }
}
