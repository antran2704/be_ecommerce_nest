import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { Observable } from "rxjs";
import { v4 as uuidv4 } from "uuid";
import * as path from "path";

import { MULTER_ERROR_MESSAGES } from "./messages/multer_error";

const storageConfig = (configService: ConfigService, customPath: string) => {
  const MULTER_DESTINATION = configService.get<string>("multer.destination");
  return diskStorage({
    destination: customPath
      ? MULTER_DESTINATION + customPath
      : MULTER_DESTINATION, // Folder to save file
    filename: (
      _,
      file: Express.Multer.File,
      callback: (error: Error | null, filename: string) => void,
    ) => {
      // Tạo tên file duy nhất
      const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
      callback(null, uniqueName);
    },
  });
};

const imageFileFilter = (
  _,
  file: Express.Multer.File,
  callback: (error: Error | null, acceptFile: boolean) => void,
) => {
  // Check file type
  if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
    callback(null, true);
  } else {
    callback(
      new BadRequestException(MULTER_ERROR_MESSAGES.INVALID_IMAGE_FILE_TYPE),
      false,
    );
  }
};

export function FileUploadInterceptor(folder: string): any {
  @Injectable()
  class MixinInterceptor implements NestInterceptor {
    private interceptor: NestInterceptor;

    constructor(private configService: ConfigService) {
      const MULTER_FILE_SIZE =
        this.configService.get<string>("multer.fileSize");

      this.interceptor = new (FileInterceptor("file", {
        storage: storageConfig(configService, folder),
        fileFilter: imageFileFilter,
        limits: {
          fileSize: MULTER_FILE_SIZE
            ? Number(MULTER_FILE_SIZE)
            : 2 * 1024 * 1024,
        }, // Limit file size 2MB
      }))();
    }

    intercept(
      context: ExecutionContext,
      next: CallHandler,
    ): Observable<any> | Promise<Observable<any>> {
      return this.interceptor.intercept(context, next);
    }
  }

  return MixinInterceptor;
}
