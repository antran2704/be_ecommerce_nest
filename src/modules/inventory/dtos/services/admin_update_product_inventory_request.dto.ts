import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export default class AdminUpdateProductRequestDto {
  @ApiProperty({
    required: true,
    example: 10,
  })
  @IsNumber()
  stock: number;
}
