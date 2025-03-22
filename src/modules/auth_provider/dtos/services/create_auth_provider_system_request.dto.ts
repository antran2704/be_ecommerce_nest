import { IsEmail, IsNotEmpty } from "class-validator";

export default class CreateAuthProviderSystemRequestDto {
  @IsNotEmpty()
  @IsEmail()
  userId: string;
}
