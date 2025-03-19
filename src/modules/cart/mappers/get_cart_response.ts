import { createMap, forMember, mapFrom, Mapper } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { CartEntity } from "../entities/cart.entity";
import { GetCartResponseDto } from "../dtos/services";

export class GetCartReponseMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        CartEntity,
        GetCartResponseDto,
        forMember(
          (dest: GetCartResponseDto) => dest?.cartId,
          mapFrom((src: CartEntity) => src.id),
        ),
        forMember(
          (dest: GetCartResponseDto) => dest?.cartStatus,
          mapFrom((src: CartEntity) => src.status),
        ),
        forMember(
          (dest: GetCartResponseDto) => dest?.cartTotal,
          mapFrom((src: CartEntity) => src.total),
        ),
        forMember(
          (dest: GetCartResponseDto) => dest?.createdAt,
          mapFrom((src: CartEntity) => src.created_at),
        ),
      );
    };
  }
}
