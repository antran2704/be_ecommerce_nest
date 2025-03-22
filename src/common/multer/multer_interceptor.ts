import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { v4 as uuidv4 } from "uuid";
import * as path from "path";
import { BadRequestException } from "@nestjs/common";
import { MULTER_ERROR_MESSAGES } from "./messages/multer_error";

const storageConfig = (customPath: string) => {
  return diskStorage({
    destination: customPath ? "./uploads" + customPath : "./uploads", // Folder to save file
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

export const getImagePath = (filename: string) => {
  return filename.replace("uploads", "");
};

export const FileUploadInterceptor = (customPath?: string) => {
  return FileInterceptor("file", {
    storage: storageConfig(customPath),
    fileFilter: imageFileFilter,
    limits: { fileSize: 2 * 1024 * 1024 }, // Limit file size 2MB
  });
};
