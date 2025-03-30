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
import {
  CreateSuccessResponse,
  DeletedSuccessResponse,
  GetSuccessResponse,
  UpdatedSuccessResponse,
} from "~/common/response/success.response";
import { ApiOkResponseDecorator } from "~/common/pagination/decorators/api-ok-response.decorator";
import AdminGetInventoryResponseDto from "../dtos/services/admin_get_inventory_response.dto";
import {
  AdminCreateVariantProductInventoryRequestDto,
  AdminGetVariantProductInventoryRequestDto,
  AdminUpdateInventoryRequestDto,
} from "../dtos/services";
import { AdminVariantProductInventoryService } from "../services/admin_variant_product_inventory.service";

@ApiBearerAuth()
@Controller("admin/inventories/variant-product")
@ApiTags("Admin.VariantProductInventory")
export class AdminVariantProductInventoryController {
  constructor(private readonly service: AdminVariantProductInventoryService) {}

  @Get("/")
  @Permissions([ENUM_PERMISSION.ADMIN_VARIANT_PRODUCT_INVENTORY_VIEW])
  @UseGuards(PermissionGuard)
  @ApiOkResponseDecorator(AdminGetInventoryResponseDto)
  async getProductInventories(
    @Query() query: AdminGetVariantProductInventoryRequestDto,
  ): Promise<GetSuccessResponse<AdminGetInventoryResponseDto[]>> {
    const data = await this.service.getVariantProductInventories(query);

    return new GetSuccessResponse(data);
  }

  @Get("/:variant_product_id/stock")
  @Permissions([ENUM_PERMISSION.ADMIN_VARIANT_PRODUCT_INVENTORY_VIEW])
  @UseGuards(PermissionGuard)
  async getProductInventory(
    @Param("variant_product_id") id: string,
  ): Promise<GetSuccessResponse<number>> {
    const data = await this.service.getVariantProductInventory(id);

    return new GetSuccessResponse(data);
  }

  @Post("/")
  @ApiResponse({
    status: 201,
    example: new CreateSuccessResponse(),
  })
  @Permissions([ENUM_PERMISSION.ADMIN_VARIANT_PRODUCT_INVENTORY_CREATE])
  @UseGuards(PermissionGuard)
  async createProductInventory(
    @Body() payload: AdminCreateVariantProductInventoryRequestDto,
  ): Promise<CreateSuccessResponse> {
    await this.service.createVariantProductInventory(payload);
    return new CreateSuccessResponse();
  }

  @Patch("/:variant_product_id")
  @ApiResponse({
    status: 201,
    example: new UpdatedSuccessResponse(),
  })
  @Permissions([ENUM_PERMISSION.ADMIN_VARIANT_PRODUCT_INVENTORY_UPDATE])
  @UseGuards(PermissionGuard)
  async updateProductInventory(
    @Param("variant_product_id") id: string,
    @Body() payload: AdminUpdateInventoryRequestDto,
  ) {
    await this.service.updateVariantProductInventory(id, payload);

    return new UpdatedSuccessResponse();
  }

  @Delete("/:variant_product_id")
  @Permissions([ENUM_PERMISSION.ADMIN_VARIANT_PRODUCT_INVENTORY_DELETE])
  @UseGuards(PermissionGuard)
  @ApiResponse({
    status: 201,
    example: new DeletedSuccessResponse(),
  })
  async deleteProductInventory(
    @Param("variant_product_id") id: string,
  ): Promise<DeletedSuccessResponse> {
    await this.service.deleteVariantProductIventory(id);
    return new DeletedSuccessResponse();
  }
}
