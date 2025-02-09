import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { ENUM_PREFIX_DATABASE } from "~/common/database/enums/perfix.enum";
import { GetDatabaseDefaultID } from "~/helpers/database";

export default class GetVariantTypeValueResponseDto {
  @ApiProperty({
    example: GetDatabaseDefaultID(ENUM_PREFIX_DATABASE.VTE) + "123",
  })
  @IsString()
  variantTypeValueId: string;

  @ApiProperty({
    example: "512 GB",
  })
  @IsString()
  variantTypeValueName: string;
}
