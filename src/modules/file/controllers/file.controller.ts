import { Controller, Get, NotFoundException, Param, Res } from "@nestjs/common";
import { join, resolve } from "path";
import * as fs from "fs";

@Controller("files")
export class FilesController {
  @Get("*path")
  async getFile(@Param() params, @Res() res) {
    const pathSegments = params.path;
    const filePath = join(resolve(), "./uploads", pathSegments.join("/"));

    if (!fs.existsSync(filePath)) {
      throw new NotFoundException("FILE_NOT_FOUND");
    }

    return res.sendFile(filePath);
  }
}
