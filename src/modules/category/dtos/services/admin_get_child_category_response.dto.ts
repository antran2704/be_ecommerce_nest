import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export default class AdminGetChildCategoryResponseDto {
  @ApiProperty({
    required: true,
    example: "CA123",
  })
  @IsString()
  categoryId: string;

  @ApiProperty({
    required: true,
    example: "Clothes",
  })
  @IsString()
  categoryName: string;

  @ApiProperty({
    required: true,
    example: 0,
  })
  @IsNumber()
  categoryIndex: number;

  @ApiProperty({
    required: true,
    example: 0,
  })
  @IsNumber()
  childrenCount: number;

  @ApiProperty({
    example: "2025-01-07T07:53:40.829Z",
  })
  createdAt: string;
}
