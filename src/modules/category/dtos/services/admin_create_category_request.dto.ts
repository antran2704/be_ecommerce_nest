import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export default class AdminCreateCategoryRequestDto {
  @ApiProperty({
    required: true,
    example: "Clothes",
  })
  @IsNotEmpty()
  @IsString()
  categoryName: string;

  @ApiPropertyOptional({
    example: "CA123",
  })
  @IsString()
  @IsOptional()
  categoryParentId: string;

  @ApiPropertyOptional({
    example: "this-is-slug",
  })
  @IsString()
  categorySlug: string;

  @ApiPropertyOptional({
    example: "/path/to/thumbnail",
  })
  @IsString()
  categoryThumbnail: string;
}
