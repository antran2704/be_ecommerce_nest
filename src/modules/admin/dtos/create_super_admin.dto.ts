import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateSuperAdminDto {
  @ApiProperty({
    required: true,
    example: "admin@gmail.com",
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    required: true,
    example: "admin",
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    required: true,
    example: "xyz123",
  })
  @IsNotEmpty()
  @IsString()
  godKey: string;
}
