import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config();

dotenv.config({
  path: [
    path.resolve(__dirname, "../../.env.development"),
    path.resolve(__dirname, "../../.env.production"),
    path.resolve(__dirname, "../../.env"),
  ],
});

const MULTER_DESTINATION = process.env.MULTER_DESTINATION;
const MULTER_FILE_SIZE = process.env.MULTER_FILE_SIZE;
const MULTER_HOST = process.env.MULTER_HOST;

export { MULTER_DESTINATION, MULTER_FILE_SIZE, MULTER_HOST };
