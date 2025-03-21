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

import { JwtAuthGuard } from "~/common/auth/guards";

import {
  CreateCartItemRequestDto,
  GetCartItemResponseDto,
  GetCartItemsRequestDto,
  UpdateCartItemQuantityRequestDto,
} from "../dtos/services";
import { CartItemService } from "../services/cart_item.service";
import { ApiOkResponsePaginateDecorator } from "~/common/pagination/decorators/api-ok-response-paginate.decorator";
import { PaginationRequestPipe } from "~/common/request/pipes/pagination_request.pipe";
import {
  CreateSuccessResponse,
  DeletedSuccessResponse,
  GetSuccessWithPaginationResponse,
  UpdatedSuccessResponse,
} from "~/common/response/success.response";

@ApiBearerAuth()
@Controller("user/cart-items")
@ApiTags("User.CartItems")
export class UserCartItemController {
  constructor(private readonly service: CartItemService) {}

  @Get()
  // @UseGuards(JwtAuthGuard)
  @ApiOkResponsePaginateDecorator(GetCartItemResponseDto)
  async getCartItems(
    @Query(PaginationRequestPipe) query: GetCartItemsRequestDto,
  ): Promise<GetSuccessWithPaginationResponse<GetCartItemResponseDto>> {
    const { data, pagination } = await this.service.getCartItems(query);

    return new GetSuccessWithPaginationResponse(data, pagination);
  }

  @Post()
  // @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 201,
    example: new CreateSuccessResponse(),
  })
  async createCartItem(
    @Body() body: CreateCartItemRequestDto,
  ): Promise<CreateSuccessResponse> {
    await this.service.createCartItem(body);

    return new CreateSuccessResponse();
  }

  @Patch("/:cart_item_id/quantity")
  // @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 201,
    example: new UpdatedSuccessResponse(),
  })
  async updateCartItem(
    @Param("cart_item_id") id: string,
    @Body() body: UpdateCartItemQuantityRequestDto,
  ): Promise<UpdatedSuccessResponse> {
    await this.service.updateCartItemQuantity(id, body);
    return new UpdatedSuccessResponse();
  }

  @Delete("/:cart_item_id")
  // @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 201,
    example: new DeletedSuccessResponse(),
  })
  async deleteCartItem(
    @Param("cart_item_id") id: string,
  ): Promise<DeletedSuccessResponse> {
    await this.service.deleteCartItem(id);
    return new DeletedSuccessResponse();
  }
}
