import { IsNotEmpty, IsString } from "class-validator";

export default class CreateVariantTypeRequestDto {
  @IsNotEmpty()
  @IsString()
  variantTypeName: string;
}
