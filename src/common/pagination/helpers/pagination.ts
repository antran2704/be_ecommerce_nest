import { Repository, SelectQueryBuilder } from "typeorm";
import PaginationRequestDto from "../dtos/pagination_request.dto";
import { ENUM_PAGINATION_ORDER } from "../enums/order.enum";
import { CREATED_AT_FIELD } from "src/common/database/constants/fields.constant";
import PaginationResponseDto from "../dtos/pagination_response.dto";
import { IEntitesAndPaginationReponse } from "../interfaces/pagination.interface";

const getEntitesAndPagination = async <T>(
  model: Repository<T>,
  dto: PaginationRequestDto,
  extraFilter?: (
    query: SelectQueryBuilder<T>,
    originalNameEntity?: string,
  ) => void,
): Promise<IEntitesAndPaginationReponse<T>> => {
  let { page, limit, order } = dto;

  if (!page) page = 1;
  if (!limit) limit = 10;
  if (!order) order = ENUM_PAGINATION_ORDER.DESC;

  const ORIGINAL_NAME_ENTITY = "entity";

  // Init sort
  const sorts = getSort(dto.sort, model);

  const queryBuilder = model.createQueryBuilder(ORIGINAL_NAME_ENTITY);

  // add mutiple sort
  sorts.forEach((sortOption) => {
    queryBuilder.addOrderBy(
      `${ORIGINAL_NAME_ENTITY}.${sortOption}`,
      order === ENUM_PAGINATION_ORDER.ASC
        ? ENUM_PAGINATION_ORDER.ASC
        : ENUM_PAGINATION_ORDER.DESC,
    );
  });

  if (extraFilter) {
    extraFilter(queryBuilder, ORIGINAL_NAME_ENTITY); // Add extra filter
  }

  const [data, total] = await queryBuilder
    .skip((page - 1) * limit)
    .take(limit)
    .getManyAndCount();

  const pagination: PaginationResponseDto = {
    page,
    take: limit,
    total,
    totalPages: Math.ceil(total / limit),
  };

  return { data, pagination };
};

function getSort<T>(sortDto: string, model: Repository<T>): string[] {
  // Init sort variable
  let sort = [];

  if (sortDto !== undefined && sortDto !== null) {
    for (const sortItem of sortDto?.split(",")) sort.push(sortItem);
  }

  // Check sort array filter have properties existed in model
  sort = sort.filter((item) =>
    Object.keys(model.metadata.columns).includes(item),
  );

  // If sort is empty, return default sort
  if (sort.length === 0) {
    sort = [CREATED_AT_FIELD];
  }

  return sort;
}

export { getEntitesAndPagination };
