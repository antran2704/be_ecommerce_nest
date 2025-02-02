import { Injectable, PipeTransform } from "@nestjs/common";
import PaginationRequestDto from "~/common/pagination/dtos/pagination_request.dto";

@Injectable()
export class PaginationRequestPipe implements PipeTransform<any> {
  async transform(value: PaginationRequestDto) {
    if (value?.page) value.page = Number(value.page);

    if (value?.limit) value.limit = Number(value.limit);

    return value;
  }
}
