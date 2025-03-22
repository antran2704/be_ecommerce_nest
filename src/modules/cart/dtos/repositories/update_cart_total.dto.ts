import { IsNumber, Min } from "class-validator";

export default class UpdateCartTotalDto {
  @IsNumber()
  @Min(0)
  total: number;
}
