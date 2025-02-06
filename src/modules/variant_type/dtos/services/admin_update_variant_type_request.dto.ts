import { IsNotEmpty, IsString } from "class-validator";

export default class UpdateVariantTypeRequestDto {
  @IsNotEmpty()
  @IsString()
  variantTypeName: string;
}
