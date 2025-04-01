import { ApiProperty } from "@nestjs/swagger";
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

export default class UpdateUserRequestDto {
  @ApiProperty({
    required: true,
    example: "admin",
  })
  @IsNotEmpty()
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
  @IsDateString()
  avatar: string;
}
