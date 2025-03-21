import { IsNumber, Min } from "class-validator";

export default class UpdateCartDto {
  @IsNumber()
  @Min(0)
  total: number;
}
