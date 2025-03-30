import { IsNotEmpty, IsString } from "class-validator";

export default class UpdateAdminMeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  avatar: string;
}
