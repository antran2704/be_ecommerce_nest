import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export default class CreateUserRequestDto {
  @ApiProperty({
    required: true,
    example: "phamtrangiaan27@gmail.com",
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    required: true,
    example: "antran",
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
    required: true,
    example: "123456",
  })
  @IsOptional()
  @IsString()
  password: string;
}
