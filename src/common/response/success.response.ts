import { ApiProperty } from "@nestjs/swagger";
import SUCCESS_RESPONSE_MESSAGES from "./message.response";
import PaginationResponseDto from "../pagination/dtos/pagination_response.dto";

class SuccessResponse {
  @ApiProperty({
    example: 200,
  })
  statusCode: number;

  @ApiProperty({
    example: "Request processed successfully",
  })
  message: string;

  constructor(
    statusCode: number = 200,
    message: string = SUCCESS_RESPONSE_MESSAGES.GET,
  ) {
    this.statusCode = statusCode;
    this.message = message;
  }
}

export class GetSuccessResponse<T> extends SuccessResponse {
  @ApiProperty({ description: "Response data" })
  data: T;

  constructor(data: T, message: string = SUCCESS_RESPONSE_MESSAGES.GET) {
    super(200, message);
    this.data = data;
  }
}

export class GetSuccessWithPaginationResponse<T> extends SuccessResponse {
  @ApiProperty({ description: "Response data" })
  data: T;

  @ApiProperty({ description: "Response data" })
  pagination: PaginationResponseDto;

  constructor(
    data: T,
    pagination: PaginationResponseDto,
    message: string = SUCCESS_RESPONSE_MESSAGES.GET,
  ) {
    super(200, message);
    this.data = data;
    this.pagination = pagination;
  }
}

export class CreateSuccessResponse extends SuccessResponse {
  constructor(message: string = SUCCESS_RESPONSE_MESSAGES.CREATED) {
    super(201, message);
  }
}

export class UpdatedSuccessResponse extends SuccessResponse {
  constructor(message: string = SUCCESS_RESPONSE_MESSAGES.UPDATED) {
    super(200, message);
  }
}

export class DeletedSuccessResponse extends SuccessResponse {
  constructor(message: string = SUCCESS_RESPONSE_MESSAGES.DELETED) {
    super(201, message);
  }
}
