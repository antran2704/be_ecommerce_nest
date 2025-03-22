import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CartItemEntity } from "./entities/cart_item.entity";
import { CartItemRepository } from "./repositories/cart_item.repository";
import { CartItemService } from "./services/cart_item.service";
import { CartModule } from "./cart.module";
import { AdminProductModule } from "../product/admin_product.module";
import { AdminVariantProductModule } from "../variant_product/admin_variant_product.module";
import { GetCartItemReponseMapper } from "./mappers/get_cart_item_response";

@Module({
  imports: [
    TypeOrmModule.forFeature([CartItemEntity]),
    CartModule,
    AdminProductModule,
    AdminVariantProductModule,
  ],
  providers: [GetCartItemReponseMapper, CartItemRepository, CartItemService],
  exports: [CartItemService],
})
export class CartItemModule {}
