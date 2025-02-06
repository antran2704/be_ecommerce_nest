import { IsString } from "class-validator";

export default class GetVariantTypeResponseDto {
  @IsString()
  variantTypeId: string;

  @IsString()
  variantTypeName: string;
}
