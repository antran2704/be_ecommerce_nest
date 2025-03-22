import { applyDecorators } from "@nestjs/common";
import {
  ApiBody,
  ApiExtraModels,
  ApiResponse,
  getSchemaPath,
} from "@nestjs/swagger";
import { CreateSuccessWithDataResponse } from "~/common/response/success.response";

export const ApiMulterRequestDecorator = () =>
  applyDecorators(
    ApiExtraModels(CreateSuccessWithDataResponse),
    ApiBody({
      schema: {
        type: "object",
        properties: {
          file: {
            type: "string",
            format: "binary",
          },
        },
      },
    }),
    ApiResponse({
      status: 201,
      schema: {
        allOf: [
          { $ref: getSchemaPath(CreateSuccessWithDataResponse) },
          {
            properties: {
              data: {
                type: "string",
                example: "/uploads/1.jpg",
              },
            },
          },
        ],
      },
    }),
  );
