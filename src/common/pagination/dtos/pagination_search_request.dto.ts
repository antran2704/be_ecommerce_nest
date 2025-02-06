import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import PaginationRequestDto from "./pagination_request.dto";

class PaginationSearchRequestDto extends PaginationRequestDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  search?: string;
}

export default PaginationSearchRequestDto;
