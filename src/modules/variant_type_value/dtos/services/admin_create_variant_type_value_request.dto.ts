import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { ENUM_PREFIX_DATABASE } from "~/common/database/enums/perfix.enum";

export default class CreateVariantTypeValueRequestDto {
  @ApiProperty({
    required: true,
    example: ENUM_PREFIX_DATABASE.VT + "123",
  })
  @IsNotEmpty()
  @IsString()
  variantTypeId: string;

  @ApiProperty({
    required: true,
    example: "Colors",
  })
  @IsNotEmpty()
  @IsString()
  variantValueName: string;
}
