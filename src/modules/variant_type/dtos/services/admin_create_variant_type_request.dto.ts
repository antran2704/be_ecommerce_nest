import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export default class CreateVariantTypeRequestDto {
  @ApiProperty({
    required: true,
    example: "Colors",
  })
  @IsNotEmpty()
  @IsString()
  variantTypeName: string;
}
