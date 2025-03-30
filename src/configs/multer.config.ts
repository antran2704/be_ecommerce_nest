import { registerAs } from "@nestjs/config";

export default registerAs("multer", () => ({
  destination: process.env.MULTER_DESTINATION,
  fileSize: process.env.MULTER_FILE_SIZE,
  host: process.env.MULTER_HOST,
}));
