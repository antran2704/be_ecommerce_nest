import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import PaginationRequestDto from "src/common/pagination/dtos/pagination_request.dto";

@Injectable()
export class PaginationRequestPipe implements PipeTransform<any> {
  async transform(value: PaginationRequestDto, { metatype }: ArgumentMetadata) {
    if (value?.page) value.page = Number(value.page);

    if (value?.limit) value.limit = Number(value.limit);

    return value;
  }
}
