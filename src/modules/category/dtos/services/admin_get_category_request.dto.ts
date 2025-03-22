import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export default class AdminGetCategoryRequestDto {
  @ApiProperty({
    required: true,
    example: "CA123",
  })
  @IsNotEmpty()
  @IsString()
  categoryId: string;
}
