import { Module } from "@nestjs/common";

import { CommonModule } from "../common/common.module";
import { MiddlewareModule } from "./middlewares/middleware.module";

@Module({
  imports: [MiddlewareModule, CommonModule],
})
export class AppModule {}
