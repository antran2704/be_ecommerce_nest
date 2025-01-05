import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import PaginationRequestDto from "./pagination_request.dto";

class PaginationSearchRequestDto extends PaginationRequestDto {
  @ApiProperty({
    example: "searh text",
  })
  @IsString()
  @IsOptional()
  search: string;
}

export default PaginationSearchRequestDto;
