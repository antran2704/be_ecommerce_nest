import { applyDecorators, Type } from "@nestjs/common";
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from "@nestjs/swagger";
import { GetSuccessWithPaginationResponse } from "~/common/response/success.response";
import PaginationResponseDto from "../dtos/pagination_response.dto";

export const ApiOkResponsePaginateDecorator = <DataDto extends Type<unknown>>(
  datDto: DataDto,
) =>
  applyDecorators(
    ApiExtraModels(GetSuccessWithPaginationResponse, datDto),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(GetSuccessWithPaginationResponse) },
          {
            properties: {
              data: {
                type: "array",
                items: { $ref: getSchemaPath(datDto) },
              },
              pagination: {
                $ref: getSchemaPath(PaginationResponseDto),
              },
            },
          },
        ],
      },
    }),
  );
