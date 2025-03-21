import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

import { ENUM_PREFIX_DATABASE } from "~/common/database/enums/perfix.enum";
import { IProductCartItem } from "../../interfaces/product_cart_item.interface";
import { IVariantProductCartItem } from "../../interfaces/variant_product_cart_item.interface";

export default class GetCartItemResponseDto {
  @ApiProperty({
    required: true,
    example: ENUM_PREFIX_DATABASE.CARI + "123",
  })
  @IsString()
  cartItemId: string;

  @ApiProperty({
    required: true,
    example: 1,
  })
  @IsNumber()
  quantity: number;

  @ApiProperty({
    required: true,
    example: {
      id: ENUM_PREFIX_DATABASE.PR + "123",
      name: "product name",
      quantity: 1,
    },
  })
  product: IProductCartItem;

  @ApiProperty({
    required: true,
    example: {
      id: ENUM_PREFIX_DATABASE.VPR + "123",
      name: "product name",
      quantity: 1,
    },
  })
  variantProduct: IVariantProductCartItem;
}
