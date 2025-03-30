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
  AdminCreateProductInventoryRequestDto,
  AdminGetProductInventoryRequestDto,
  AdminUpdateInventoryRequestDto,
} from "../dtos/services";
import { AdminProductInventoryService } from "../services/admin_product_inventory.service";

@ApiBearerAuth()
@Controller("admin/inventories/product")
@ApiTags("Admin.ProductInventory")
export class AdminProductInventoryController {
  constructor(private readonly service: AdminProductInventoryService) {}

  @Get("/")
  @Permissions([ENUM_PERMISSION.ADMIN_PRODUCT_INVENTORY_VIEW])
  @UseGuards(PermissionGuard)
  @ApiOkResponseDecorator(AdminGetInventoryResponseDto)
  async getProductInventories(
    @Query() query: AdminGetProductInventoryRequestDto,
  ): Promise<GetSuccessResponse<AdminGetInventoryResponseDto[]>> {
    const data = await this.service.getProductInventories(query);

    return new GetSuccessResponse(data);
  }

  @Get("/:product_id/stock")
  @Permissions([ENUM_PERMISSION.ADMIN_PRODUCT_INVENTORY_VIEW])
  @UseGuards(PermissionGuard)
  async getProductInventory(
    @Param("product_id") id: string,
  ): Promise<GetSuccessResponse<number>> {
    const data = await this.service.getProductInventory(id);

    return new GetSuccessResponse(data);
  }

  @Post("/")
  @ApiResponse({
    status: 201,
    example: new CreateSuccessResponse(),
  })
  @Permissions([ENUM_PERMISSION.ADMIN_PRODUCT_INVENTORY_CREATE])
  @UseGuards(PermissionGuard)
  async createProductInventory(
    @Body() payload: AdminCreateProductInventoryRequestDto,
  ): Promise<CreateSuccessResponse> {
    await this.service.createProductInventory(payload);
    return new CreateSuccessResponse();
  }

  @Patch("/:product_id")
  @ApiResponse({
    status: 201,
    example: new UpdatedSuccessResponse(),
  })
  @Permissions([ENUM_PERMISSION.ADMIN_PRODUCT_INVENTORY_UPDATE])
  @UseGuards(PermissionGuard)
  async updateProductInventory(
    @Param("product_id") id: string,
    @Body() payload: AdminUpdateInventoryRequestDto,
  ) {
    await this.service.updateProductInventory(id, payload);

    return new UpdatedSuccessResponse();
  }

  @Delete("/:product_id")
  @Permissions([ENUM_PERMISSION.ADMIN_PRODUCT_INVENTORY_DELETE])
  @UseGuards(PermissionGuard)
  @ApiResponse({
    status: 201,
    example: new DeletedSuccessResponse(),
  })
  async deleteProductInventory(
    @Param("product_id") id: string,
  ): Promise<DeletedSuccessResponse> {
    await this.service.deleteProductIventory(id);
    return new DeletedSuccessResponse();
  }
}
