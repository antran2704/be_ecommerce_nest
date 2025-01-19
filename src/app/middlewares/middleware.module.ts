import {
  MiddlewareConsumer,
  Module,
  NestModule,
  ValidationPipe,
} from "@nestjs/common";
import { APP_FILTER, APP_PIPE } from "@nestjs/core";

import { HelmetMiddleware } from "./helmet.middleware";
import { HttpExceptionFilter } from "src/common/exceptionFilter/http-exception.filter";

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useFactory: () => {
        return new ValidationPipe({
          whitelist: true, // Remove properties that do not have in DTO
          transform: true, // Automatically transform payloads to DTO instances
          forbidNonWhitelisted: true, // Throw an error when properties that do not have in DTO
        });
      },
    },
  ],
})
export class MiddlewareModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HelmetMiddleware).forRoutes("*");
  }
}
