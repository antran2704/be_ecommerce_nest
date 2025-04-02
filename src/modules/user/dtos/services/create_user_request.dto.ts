import { ApiProperty } from "@nestjs/swagger";
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

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
  @IsString()
  name: string;

  @ApiProperty({
    required: true,
    example: "0946xxxx",
  })
  @IsOptional()
  @IsString()
  phoneNumber: string;

  @ApiProperty({
    required: true,
    example: "2025-04-01T14:10:20.176Z",
  })
  @IsOptional()
  @IsDateString()
  birthday: string;

  @ApiProperty({
    required: true,
    example: "/images/avatar.jpg",
  })
  @IsOptional()
  @IsString()
  avatar: string;

  @ApiProperty({
    required: true,
    example: "123456",
  })
  @IsOptional()
  @IsString()
  password: string;
}
