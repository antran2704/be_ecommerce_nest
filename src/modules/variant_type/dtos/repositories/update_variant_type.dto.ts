import { IsNotEmpty, IsString } from "class-validator";

export default class UpdateVariantTypeDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
