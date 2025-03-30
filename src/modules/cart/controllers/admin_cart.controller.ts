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
import { CartService } from "../services/cart.service";
import {
  CreateCartRequestDto,
  GetCartResponseDto,
  GetCartsRequestDto,
} from "../dtos/services";

@ApiBearerAuth()
@Controller("admin/carts")
@ApiTags("Admin.Cart")
export class AdminCartController {
  constructor(private readonly service: CartService) {}

  @Get()
  @Permissions([ENUM_PERMISSION.ADMIN_CART_VIEW])
  @UseGuards(PermissionGuard)
  @ApiOkResponsePaginateDecorator(GetCartResponseDto)
  async getCarts(
    @Query(PaginationRequestPipe) query: GetCartsRequestDto,
  ): Promise<GetSuccessWithPaginationResponse<GetCartResponseDto>> {
    const { data, pagination } = await this.service.getCarts(query);

    return new GetSuccessWithPaginationResponse(data, pagination);
  }

  @Get("/:user_id")
  @Permissions([ENUM_PERMISSION.ADMIN_CART_VIEW])
  @UseGuards(PermissionGuard)
  @ApiOkResponseDecorator(GetCartResponseDto)
  async getCart(
    @Param("user_id") id: string,
  ): Promise<GetSuccessResponse<GetCartResponseDto>> {
    const data = await this.service.getCartByUserId(id);

    return new GetSuccessResponse(data);
  }

  @Post()
  @ApiResponse({
    status: 201,
    example: new CreateSuccessResponse(),
  })
  @Permissions([ENUM_PERMISSION.ADMIN_CART_CREATE])
  @UseGuards(PermissionGuard)
  async createCart(
    @Body() payload: CreateCartRequestDto,
  ): Promise<CreateSuccessResponse> {
    await this.service.createCart(payload);
    return new CreateSuccessResponse();
  }

  @Patch("/:cart_id/enable")
  @Permissions([ENUM_PERMISSION.ADMIN_CART_UPDATE])
  @UseGuards(PermissionGuard)
  @ApiResponse({
    status: 201,
    example: new UpdatedSuccessResponse(),
  })
  async enableCart(
    @Param("cart_id") id: string,
  ): Promise<UpdatedSuccessResponse> {
    await this.service.enableCart(id);
    return new UpdatedSuccessResponse();
  }

  @Patch("/:cart_id/disable")
  @Permissions([ENUM_PERMISSION.ADMIN_CART_UPDATE])
  @UseGuards(PermissionGuard)
  @ApiResponse({
    status: 201,
    example: new UpdatedSuccessResponse(),
  })
  async disableCart(
    @Param("cart_id") id: string,
  ): Promise<UpdatedSuccessResponse> {
    await this.service.disableCart(id);
    return new UpdatedSuccessResponse();
  }

  @Delete("/:cart_id")
  @Permissions([ENUM_PERMISSION.ADMIN_CART_DELETE])
  @UseGuards(PermissionGuard)
  @ApiResponse({
    status: 201,
    example: new DeletedSuccessResponse(),
  })
  async deleteCart(
    @Param("cart_id") id: string,
  ): Promise<DeletedSuccessResponse> {
    await this.service.deleteCart(id);
    return new DeletedSuccessResponse();
  }
}
