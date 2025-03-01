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
import { AdminInventoryService } from "../services/admin_inventory.service";
import AdminGetInventoryResponseDto from "../dtos/services/admin_get_inventory_response.dto";
import {
  AdminCreateProductInventoryRequestDto,
  AdminGetProductInventoryRequestDto,
  AdminUpdateProductInventoryRequestDto,
} from "../dtos/services";

@ApiBearerAuth()
@Controller("admin/inventories")
@ApiTags("Admin.Inventory")
export class AdminInventoryController {
  constructor(private readonly productService: AdminInventoryService) {}

  @Get("/product")
  @Permissions([ENUM_PERMISSION.PRODUCT_VIEW])
  @UseGuards(PermissionGuard)
  @ApiOkResponseDecorator(AdminGetInventoryResponseDto)
  async getProductInventories(
    @Query() query: AdminGetProductInventoryRequestDto,
  ): Promise<GetSuccessResponse<AdminGetInventoryResponseDto[]>> {
    const data = await this.productService.getProductInventories(query);

    return new GetSuccessResponse(data);
  }

  @Get("/product/:product_id/stock")
  @Permissions([ENUM_PERMISSION.PRODUCT_VIEW])
  @UseGuards(PermissionGuard)
  async getProductInventory(
    @Param("product_id") id: string,
  ): Promise<GetSuccessResponse<number>> {
    const data = await this.productService.getProductInventory(id);

    return new GetSuccessResponse(data);
  }

  @Post("/product")
  @ApiResponse({
    status: 201,
    example: new CreateSuccessResponse(),
  })
  @Permissions([ENUM_PERMISSION.PRODUCT_CREATE])
  @UseGuards(PermissionGuard)
  async createProductInventory(
    @Body() payload: AdminCreateProductInventoryRequestDto,
  ): Promise<CreateSuccessResponse> {
    await this.productService.createProductInventory(payload);
    return new CreateSuccessResponse();
  }

  @Patch("/product/:product_id")
  @ApiResponse({
    status: 201,
    example: new UpdatedSuccessResponse(),
  })
  @Permissions([ENUM_PERMISSION.PRODUCT_UPDATE])
  @UseGuards(PermissionGuard)
  async updateProductInventory(
    @Param("product_id") id: string,
    @Body() payload: AdminUpdateProductInventoryRequestDto,
  ) {
    await this.productService.updateProductInventory(id, payload);

    return new UpdatedSuccessResponse();
  }

  @Delete("/product/:product_id")
  @Permissions([ENUM_PERMISSION.PRODUCT_DELETE])
  @UseGuards(PermissionGuard)
  @ApiResponse({
    status: 201,
    example: new DeletedSuccessResponse(),
  })
  async deleteProductInventory(
    @Param("product_id") id: string,
  ): Promise<DeletedSuccessResponse> {
    await this.productService.deleteProductIventory(id);
    return new DeletedSuccessResponse();
  }
}
