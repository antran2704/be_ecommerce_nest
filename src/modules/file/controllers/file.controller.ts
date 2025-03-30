import { Controller, Get, NotFoundException, Param, Res } from "@nestjs/common";
import { join, resolve } from "path";
import * as fs from "fs";

@Controller("files")
export class FilesController {
  @Get("/*path")
  async getFile(@Param("path") path: string, @Res() res) {
    const pathSegments = path.replaceAll(",", "/");
    const filePath = join(resolve(), "./uploads", pathSegments);
    if (!fs.existsSync(filePath)) {
      throw new NotFoundException("FILE_NOT_FOUND");
    }

    return res.sendFile(filePath);
  }
}
