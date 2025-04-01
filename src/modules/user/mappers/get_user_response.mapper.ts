import { createMap, forMember, mapFrom, Mapper } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { UserEntity } from "../entities/user.entity";
import { GetUserResponseDto } from "../dtos";

export class GetUserReponseMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        UserEntity,
        GetUserResponseDto,
        forMember(
          (dest: GetUserResponseDto) => dest?.isActive,
          mapFrom((src: UserEntity) => src.is_active),
        ),
        forMember(
          (dest: GetUserResponseDto) => dest?.userId,
          mapFrom((src: UserEntity) => src.id),
        ),
        forMember(
          (dest: GetUserResponseDto) => dest?.phoneNumber,
          mapFrom((src: UserEntity) => src.phone_number),
        ),
        forMember(
          (dest: GetUserResponseDto) => dest?.providers,
          mapFrom((src: UserEntity) =>
            src.authProviders.map((x) => ({
              providerId: x.id,
              provider: x.provider,
            })),
          ),
        ),
        forMember(
          (dest: GetUserResponseDto) => dest?.createdAt,
          mapFrom((src: UserEntity) => src.created_at),
        ),
      );
    };
  }
}
