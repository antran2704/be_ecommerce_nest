import { Repository } from "typeorm";
import PaginationRequestDto from "../dtos/pagination_request.dto";
import { ENUM_PAGINATION_ORDER } from "../enums/order.enum";
import { CREATED_AT_FIELD } from "src/common/database/constants/fields.constant";
import PaginationResponseDto from "../dtos/pagination_response.dto";

const getEntitesAndPagination = async <T>(
  model: Repository<T>,
  dto: PaginationRequestDto,
  extraFilter?: any,
): Promise<{ data: T[]; pagination: PaginationResponseDto }> => {
  let { page, limit, order } = dto;

  if (!page) page = 1;
  if (!limit) limit = 10;
  if (!order) order = ENUM_PAGINATION_ORDER.DESC;

  // Init sort
  const sort = getSort(dto.sort, model);

  const [data, total] = await model.findAndCount({
    where: extraFilter,
    order: sort.reduce((acc, cur) => {
      acc[cur] =
        order === ENUM_PAGINATION_ORDER.ASC
          ? ENUM_PAGINATION_ORDER.ASC
          : ENUM_PAGINATION_ORDER.DESC;
      return acc;
    }, {}),
    take: limit,
    skip: (page - 1) * limit,
  });

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
