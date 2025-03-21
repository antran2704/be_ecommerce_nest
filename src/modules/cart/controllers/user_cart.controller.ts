import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { JwtAuthGuard } from "~/common/auth/guards";

import { GetSuccessResponse } from "~/common/response/success.response";
import { ApiOkResponseDecorator } from "~/common/pagination/decorators/api-ok-response.decorator";
import { CartService } from "../services/cart.service";
import { GetCartResponseDto } from "../dtos/services";

@ApiBearerAuth()
@Controller("user/cart")
@ApiTags("User.Cart")
export class UserCartController {
  constructor(private readonly service: CartService) {}

  @Get("/:user_id")
  @UseGuards(JwtAuthGuard)
  @ApiOkResponseDecorator(GetCartResponseDto)
  async getCart(
    @Param("user_id") id: string,
  ): Promise<GetSuccessResponse<GetCartResponseDto>> {
    const data = await this.service.getCartByUserId(id);

    return new GetSuccessResponse(data);
  }
}
