import { IsNotEmpty, IsString } from "class-validator";

export default class UpdateVariantTypeValueDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
