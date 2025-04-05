import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export default class AdminGetCategoriesResponseDto {
  @ApiProperty({
    required: true,
    example: "CA123",
  })
  @IsString()
  @AutoMap()
  categoryId: string;

  @ApiProperty({
    required: true,
    example: "Clothes",
  })
  @IsString()
  @AutoMap()
  categoryName: string;

  @ApiProperty({
    required: true,
    example: "/path/to/thumbnail",
  })
  @IsString()
  @AutoMap()
  categoryThumbnail: string;

  @ApiProperty({
    required: true,
    example: 0,
  })
  @IsNumber()
  childrenCount: number;

  @ApiProperty({
    example: "2025-01-07T07:53:40.829Z",
  })
  @AutoMap()
  createdAt: string;
}
