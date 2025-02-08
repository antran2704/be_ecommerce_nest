import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export default class UpdateVariantTypeRequestDto {
  @ApiProperty({
    required: true,
    example: "Blue",
  })
  @IsNotEmpty()
  @IsString()
  variantTypeValueName: string;
}
