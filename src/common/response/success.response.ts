import { ApiProperty } from "@nestjs/swagger";
import SUCCESS_RESPONSE_MESSAGES from "./message.response";
import PaginationResponseDto from "../pagination/dtos/pagination_response.dto";

export class SuccessResponse {
  @ApiProperty({
    example: 200,
  })
  statusCode: number;

  @ApiProperty({
    example: "Request processed successfully",
  })
  message: string;

  constructor(
    message: string = SUCCESS_RESPONSE_MESSAGES.GET,
    statusCode: number = 200,
  ) {
    this.statusCode = statusCode;
    this.message = message;
  }
}

export class GetSuccessResponse<T> extends SuccessResponse {
  @ApiProperty({ description: "Response data" })
  data: T;

  constructor(data: T, message: string = SUCCESS_RESPONSE_MESSAGES.GET) {
    super(message, 200);
    this.data = data;
  }
}

export class GetSuccessWithPaginationResponse<T> extends SuccessResponse {
  @ApiProperty({ description: "Response data" })
  data: T[];

  @ApiProperty({ description: "Response data" })
  pagination: PaginationResponseDto;

  constructor(
    data: T[],
    pagination: PaginationResponseDto,
    message: string = SUCCESS_RESPONSE_MESSAGES.GET,
  ) {
    super(message, 200);
    this.data = data;
    this.pagination = pagination;
  }
}

export class CreateSuccessResponse extends SuccessResponse {
  constructor(message: string = SUCCESS_RESPONSE_MESSAGES.CREATED) {
    super(message, 201);
  }
}

export class CreateSuccessWithDataResponse<T> extends SuccessResponse {
  @ApiProperty({ description: "Response data" })
  data: T;

  constructor(data: T, message: string = SUCCESS_RESPONSE_MESSAGES.CREATED) {
    super(message, 201);
    this.data = data;
  }
}

export class UpdatedSuccessResponse extends SuccessResponse {
  constructor(message: string = SUCCESS_RESPONSE_MESSAGES.UPDATED) {
    super(message, 201);
  }
}

export class DeletedSuccessResponse extends SuccessResponse {
  constructor(message: string = SUCCESS_RESPONSE_MESSAGES.DELETED) {
    super(message, 201);
  }
}
