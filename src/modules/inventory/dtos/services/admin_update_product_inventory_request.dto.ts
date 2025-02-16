import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, Min } from "class-validator";

export default class AdminUpdateProductInventoryRequestDto {
  @ApiProperty({
    required: true,
    example: 10,
  })
  @IsNumber()
  @Min(0)
  stock: number;
}
