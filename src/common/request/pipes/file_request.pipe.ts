import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class FileRequiredPipe implements PipeTransform {
  transform(value: File) {
    if (!value) {
      throw new BadRequestException("FILE_IS_REQUIRED");
    }
    return value;
  }
}
