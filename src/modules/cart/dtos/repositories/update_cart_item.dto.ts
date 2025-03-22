import { IsNumber, Min } from "class-validator";

export default class UpdateCartItemDto {
  @IsNumber()
  @Min(1)
  quantity: number;
}
