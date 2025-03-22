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
import { AdminVariantProductService } from "../services/admin_variant_product.service";
import {
  AdminCreateVariantProductRequestDto,
  AdminGetVariantProductDetailResponseDto,
  AdminGetVariantProductListResponseDto,
  AdminGetVariantProductsRequestDto,
  AdminUpdateVariantProductRequestDto,
} from "../dtos/services";

@ApiBearerAuth()
@Controller("admin/variant-products")
@ApiTags("Admin.VariantProduct")
export class AdminVariantProductController {
  constructor(private readonly service: AdminVariantProductService) {}

  @Get()
  @Permissions([ENUM_PERMISSION.VARIANT_PRODUCT_VIEW])
  @UseGuards(PermissionGuard)
  @ApiOkResponsePaginateDecorator(AdminGetVariantProductListResponseDto)
  async getProducts(
    @Query(PaginationRequestPipe) query: AdminGetVariantProductsRequestDto,
  ): Promise<
    GetSuccessWithPaginationResponse<AdminGetVariantProductListResponseDto>
  > {
    const { data, pagination } = await this.service.getVariantProducts(query);

    return new GetSuccessWithPaginationResponse(data, pagination);
  }

  @Get("/:variant_product_id")
  @Permissions([ENUM_PERMISSION.VARIANT_PRODUCT_VIEW])
  @UseGuards(PermissionGuard)
  @ApiOkResponseDecorator(AdminGetVariantProductDetailResponseDto)
  async getProduct(
    @Param("variant_product_id") id: string,
  ): Promise<GetSuccessResponse<AdminGetVariantProductDetailResponseDto>> {
    const data = await this.service.getVariantProductById(id);

    return new GetSuccessResponse(data);
  }

  @Post()
  @ApiResponse({
    status: 201,
    example: new CreateSuccessResponse(),
  })
  @Permissions([ENUM_PERMISSION.VARIANT_PRODUCT_CREATE])
  @UseGuards(PermissionGuard)
  async createProduct(
    @Body() payload: AdminCreateVariantProductRequestDto,
  ): Promise<CreateSuccessResponse> {
    await this.service.createVariantProduct(payload);
    return new CreateSuccessResponse();
  }

  @Patch("/:variant_product_id")
  @ApiResponse({
    status: 201,
    example: new UpdatedSuccessResponse(),
  })
  @Permissions([ENUM_PERMISSION.VARIANT_PRODUCT_UPDATE])
  @UseGuards(PermissionGuard)
  async updateProduct(
    @Param("variant_product_id") id: string,
    @Body() payload: AdminUpdateVariantProductRequestDto,
  ) {
    await this.service.updateVariantProduct(id, payload);

    return new UpdatedSuccessResponse();
  }

  @Patch("/:variant_product_id/enable")
  @ApiResponse({
    status: 201,
    example: new UpdatedSuccessResponse(),
  })
  @Permissions([ENUM_PERMISSION.VARIANT_PRODUCT_UPDATE])
  @UseGuards(PermissionGuard)
  async enableProduct(@Param("variant_product_id") id: string) {
    await this.service.enableVariantProduct(id);

    return new UpdatedSuccessResponse();
  }

  @Patch("/:variant_product_id/disable")
  @ApiResponse({
    status: 201,
    example: new UpdatedSuccessResponse(),
  })
  @Permissions([ENUM_PERMISSION.VARIANT_PRODUCT_UPDATE])
  @UseGuards(PermissionGuard)
  async disableProduct(@Param("variant_product_id") id: string) {
    await this.service.disableVariantProduct(id);

    return new UpdatedSuccessResponse();
  }

  @Delete("/:variant_product_id")
  @Permissions([ENUM_PERMISSION.VARIANT_PRODUCT_DELETE])
  @UseGuards(PermissionGuard)
  @ApiResponse({
    status: 201,
    example: new DeletedSuccessResponse(),
  })
  async deleteUser(
    @Param("variant_product_id") id: string,
  ): Promise<DeletedSuccessResponse> {
    await this.service.deleteVariantProduct(id);
    return new DeletedSuccessResponse();
  }
}
