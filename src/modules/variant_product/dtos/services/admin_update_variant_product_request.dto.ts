import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from "class-validator";

export default class AdminUpdateVariantProductRequestDto {
  @ApiProperty({
    required: true,
    example: "Iphone 15 Pro Max Blue/128GB",
  })
  @IsNotEmpty()
  @IsString()
  variantProductName: string;

  @ApiProperty({
    required: true,
    example: "/path/to/thumbnail",
  })
  @IsString()
  @IsOptional()
  thumbnail: string;

  @ApiProperty({
    required: true,
    example: 1000,
  })
  @IsNumber()
  @Min(0)
  basePrice: number;

  @ApiProperty({
    required: true,
    example: 100,
  })
  @IsNumber()
  @Min(0)
  promotionPrice: number;

  @ApiProperty({
    required: true,
    example: 10,
  })
  @IsNumber()
  @Min(0)
  stock: number;
}
