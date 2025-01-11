import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { PaginationSearchRequestDto } from "src/common/pagination/dtos";

export default class SearchRolesRequestDto extends PaginationSearchRequestDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  groupRoleId: string;
}
