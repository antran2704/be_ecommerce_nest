import { IsNotEmpty, IsString } from "class-validator";

export default class CreateVariantTypeDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
