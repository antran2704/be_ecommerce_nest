import { IsNotEmpty, IsString } from "class-validator";
import { RoleEntity } from "~/modules/role/entities/role.entity";

export default class UpdateAdminDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  role: RoleEntity;

  @IsString()
  avatar: string;
}
