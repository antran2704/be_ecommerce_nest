import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CartItemEntity } from "./entities/cart_item.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CartItemEntity])],
  providers: [],
  exports: [],
})
export class CartItemModule {}
