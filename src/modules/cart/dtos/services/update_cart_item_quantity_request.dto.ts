import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, Min } from "class-validator";

export default class UpdateCartItemQuantityRequestDto {
  @ApiProperty({
    required: true,
    example: 1,
  })
  @IsNumber()
  @Min(1)
  quantity: number;
}
