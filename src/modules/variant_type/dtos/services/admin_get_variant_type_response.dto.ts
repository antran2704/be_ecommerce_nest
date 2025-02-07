import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { ENUM_PREFIX_DATABASE } from "~/common/database/enums/perfix.enum";
import { GetDatabaseDefaultID } from "~/helpers/database";

export default class GetVariantTypeResponseDto {
  @ApiProperty({
    example: GetDatabaseDefaultID(ENUM_PREFIX_DATABASE.VT) + "123",
  })
  @IsString()
  variantTypeId: string;

  @ApiProperty({
    example: "Colors",
  })
  @IsString()
  variantTypeName: string;
}
