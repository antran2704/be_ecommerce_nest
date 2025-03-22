import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";

class PaginationResponseDto {
  @ApiProperty({
    example: 1,
  })
  @IsInt()
  page: number = 1;

  @ApiProperty({
    example: 10,
  })
  @IsInt()
  take: number = 10;

  @ApiProperty({
    example: 10,
  })
  @IsInt()
  total: number = 10;

  @ApiProperty({
    example: 10,
  })
  @IsInt()
  totalPages: number = 100;
}

export default PaginationResponseDto;
