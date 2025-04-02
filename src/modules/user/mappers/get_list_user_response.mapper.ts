import { createMap, forMember, mapFrom, Mapper } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { UserEntity } from "../entities/user.entity";
import { GetListUserResponseDto } from "../dtos";

export class GetListUserReponseMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        UserEntity,
        GetListUserResponseDto,
        forMember(
          (dest: GetListUserResponseDto) => dest?.isActive,
          mapFrom((src: UserEntity) => src.is_active),
        ),
        forMember(
          (dest: GetListUserResponseDto) => dest?.userId,
          mapFrom((src: UserEntity) => src.id),
        ),
        forMember(
          (dest: GetListUserResponseDto) => dest?.phoneNumber,
          mapFrom((src: UserEntity) => src.phone_number),
        ),
        forMember(
          (dest: GetListUserResponseDto) => dest?.providers,
          mapFrom((src: UserEntity) =>
            src.authProviders.map((x) => ({
              providerId: x.id,
              provider: x.provider,
            })),
          ),
        ),
        forMember(
          (dest: GetListUserResponseDto) => dest?.createdAt,
          mapFrom((src: UserEntity) => src.created_at),
        ),
      );
    };
  }
}
