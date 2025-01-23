import { IsBoolean, IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export default class SignupUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}
