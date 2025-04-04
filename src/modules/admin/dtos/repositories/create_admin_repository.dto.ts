import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { RoleEntity } from "~/modules/role/entities/role.entity";

export default class CreateAdminDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  role: RoleEntity;
}
