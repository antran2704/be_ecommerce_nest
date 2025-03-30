import { applyDecorators, Type } from "@nestjs/common";
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from "@nestjs/swagger";
import { GetSuccessResponse } from "~/common/response/success.response";

export const ApiOkResponseDecorator = <DataDto extends Type<unknown>>(
  datDto: DataDto,
) =>
  applyDecorators(
    ApiExtraModels(GetSuccessResponse, datDto),
    ApiOkResponse({
      schema: {
        allOf: [
          // { $ref: getSchemaPath(GetSuccessResponse) },
          // {
          //   properties: {
          //     data: {
          //       $ref: getSchemaPath(datDto),
          //     },
          //   },
          // },
          { $ref: getSchemaPath(datDto) },
        ],
      },
    }),
  );
