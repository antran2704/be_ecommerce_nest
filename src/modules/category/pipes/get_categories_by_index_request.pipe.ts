import { Injectable, PipeTransform } from "@nestjs/common";
import { AdminGetCategoriesByIndexRequestDto } from "../dtos/services";

@Injectable()
export class GetCategoriesByIndexRequestPipe implements PipeTransform<any> {
  async transform(value: AdminGetCategoriesByIndexRequestDto) {
    if (value.index) value.index = Number(value.index);

    return value;
  }
}
