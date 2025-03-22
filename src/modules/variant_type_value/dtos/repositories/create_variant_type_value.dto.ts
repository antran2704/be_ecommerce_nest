import { IsNotEmpty, IsString } from "class-validator";

export default class CreateVariantTypeValueDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  variant_type_id: string;
}
