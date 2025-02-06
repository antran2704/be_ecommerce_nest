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
}
