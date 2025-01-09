import PaginationResponseDto from "../dtos/pagination_response.dto";

export interface IEntitesAndPaginationReponse<T> {
  data: T[];
  pagination: PaginationResponseDto;
}
