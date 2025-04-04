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

import { Permissions } from "~/common/auth/decorators/permission.decorator";
import { ENUM_PERMISSION } from "~/modules/permissions/enums/permission.enum";
import { PermissionGuard } from "~/common/auth/guards";
import { ApiOkResponsePaginateDecorator } from "~/common/pagination/decorators/api-ok-response-paginate.decorator";
import { PaginationRequestPipe } from "~/common/request/pipes/pagination_request.pipe";
import {
  CreateSuccessResponse,
  DeletedSuccessResponse,
  GetSuccessResponse,
  GetSuccessWithPaginationResponse,
  UpdatedSuccessResponse,
} from "~/common/response/success.response";
import { ApiOkResponseDecorator } from "~/common/pagination/decorators/api-ok-response.decorator";
import { AdminProductService } from "../services/admin_product.service";
import {
  AdminCreateProductRequestDto,
  AdminGetProductDetailResponseDto,
  AdminGetProductListResponseDto,
  AdminGetProductsRequestDto,
  AdminUpdateProductRequestDto,
} from "../dtos/services";

@ApiBearerAuth()
@Controller("admin/products")
@ApiTags("Admin.Product")
export class AdminProductController {
  constructor(private readonly productService: AdminProductService) {}

  @Get()
  @Permissions([ENUM_PERMISSION.PRODUCT_VIEW])
  @UseGuards(PermissionGuard)
  @ApiOkResponsePaginateDecorator(AdminGetProductListResponseDto)
  async getProducts(
    @Query(PaginationRequestPipe) query: AdminGetProductsRequestDto,
  ): Promise<GetSuccessWithPaginationResponse<AdminGetProductListResponseDto>> {
    const { data, pagination } = await this.productService.getProducts(query);

    return new GetSuccessWithPaginationResponse(data, pagination);
  }

  @Get("/:product_id")
  @Permissions([ENUM_PERMISSION.PRODUCT_VIEW])
  @UseGuards(PermissionGuard)
  @ApiOkResponseDecorator(AdminGetProductDetailResponseDto)
  async getProduct(
    @Param("product_id") id: string,
  ): Promise<GetSuccessResponse<AdminGetProductDetailResponseDto>> {
    const data = await this.productService.getProductById(id);

    return new GetSuccessResponse(data);
  }

  @Post()
  @ApiResponse({
    status: 201,
    example: new CreateSuccessResponse(),
  })
  @Permissions([ENUM_PERMISSION.PRODUCT_CREATE])
  @UseGuards(PermissionGuard)
  async createProduct(
    @Body() payload: AdminCreateProductRequestDto,
  ): Promise<CreateSuccessResponse> {
    await this.productService.createProduct(payload);
    return new CreateSuccessResponse();
  }

  @Patch("/:product_id")
  @ApiResponse({
    status: 201,
    example: new UpdatedSuccessResponse(),
  })
  @Permissions([ENUM_PERMISSION.PRODUCT_UPDATE])
  @UseGuards(PermissionGuard)
  async updateProduct(
    @Param("product_id") id: string,
    @Body() payload: AdminUpdateProductRequestDto,
  ) {
    await this.productService.updateProduct(id, payload);

    return new UpdatedSuccessResponse();
  }

  @Patch("/:product_id/enable")
  @ApiResponse({
    status: 201,
    example: new UpdatedSuccessResponse(),
  })
  @Permissions([ENUM_PERMISSION.PRODUCT_UPDATE])
  @UseGuards(PermissionGuard)
  async enableProduct(@Param("product_id") id: string) {
    await this.productService.enableProduct(id);

    return new UpdatedSuccessResponse();
  }

  @Patch("/:product_id/disable")
  @ApiResponse({
    status: 201,
    example: new UpdatedSuccessResponse(),
  })
  @Permissions([ENUM_PERMISSION.PRODUCT_UPDATE])
  @UseGuards(PermissionGuard)
  async disableProduct(@Param("product_id") id: string) {
    await this.productService.disableProduct(id);

    return new UpdatedSuccessResponse();
  }

  @Delete("/:product_id")
  @Permissions([ENUM_PERMISSION.PRODUCT_DELETE])
  @UseGuards(PermissionGuard)
  @ApiResponse({
    status: 201,
    example: new DeletedSuccessResponse(),
  })
  async deleteUser(
    @Param("product_id") id: string,
  ): Promise<DeletedSuccessResponse> {
    await this.productService.deleteProduct(id);
    return new DeletedSuccessResponse();
  }
}
