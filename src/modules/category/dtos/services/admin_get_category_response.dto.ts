import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
import { ENUM_PREFIX_DATABASE } from "~/common/database/enums/perfix.enum";

export default class AdminGetCategoryResponseDto {
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
    example: ENUM_PREFIX_DATABASE.CA + "123",
  })
  @IsString()
  categoryParentId: string;

  @ApiProperty({
    required: true,
    example: "/path/to/thumbnail",
  })
  @IsString()
  categoryThumbnail: string;

  @ApiProperty({
    required: true,
    example: "this-is-slug",
  })
  @IsString()
  categorySlug: string;

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
