import { applyDecorators, Type } from "@nestjs/common";
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from "@nestjs/swagger";

export const ApiListOkResponseDecorator = <DataDto extends Type<unknown>>(
  datDto: DataDto,
) =>
  applyDecorators(
    ApiExtraModels(datDto),
    ApiOkResponse({
      schema: {
        allOf: [{ type: "array", items: { $ref: getSchemaPath(datDto) } }],
      },
    }),
  );
