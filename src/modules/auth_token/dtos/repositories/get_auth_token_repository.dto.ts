import { IsNotEmpty, IsString } from "class-validator";

export default class GetAuthAdminTokenDto {
  @IsNotEmpty()
  @IsString()
  userId: string;
}
