import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CartEntity } from "./entities/cart.entity";
import { CartRepository } from "./repositories/cart.repository";
import { CartService } from "./services/cart.service";
import { GetCartReponseMapper } from "./mappers/get_cart_response";

@Module({
  imports: [TypeOrmModule.forFeature([CartEntity])],
  providers: [
    // Repositories
    CartRepository,

    // Services
    CartService,

    // Mappers
    GetCartReponseMapper,
  ],
  exports: [CartService],
})
export class CartModule {}
