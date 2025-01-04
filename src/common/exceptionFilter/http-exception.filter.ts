import {
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Inject,
    Logger,
  } from '@nestjs/common';
  import * as os from 'node:os';

  
  @Catch()
  export class HttpExceptionFilter implements ExceptionFilter {
    constructor() {}
  
    catch(exception: any, host: any) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const request = ctx.getRequest();
      const path = request.url;
      const method = request.method;
      const hostName = request.headers.host || request.hostname || os.hostname();
      const ip =
        request.headers['x-forwarded-for'] ||
        request.connection.remoteAddress ||
        null;
      const message =
        exception?.response?.message || exception.message || exception;
  
      const logMetadata = {
        context: 'ErrorHttpFilter',
        trace: exception.stack,
        ip: ip,
        method: method,
        hostName: hostName,
        path: path,
        body: JSON.stringify(request.body, null, 2),
      };
  
      // Check if exception is instance of HttpException
      if (!(exception instanceof HttpException)) {
        // If not instance of HttpException, then it is a system error
        // Log the error
        Logger.fatal(message, { props: logMetadata });
  
        // Return error to client
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal server error',
        });
      }
  
      // Return error to client
      return response.status(exception.getStatus()).json({
        statusCode: exception.getStatus(),
        message: message,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }
  }
  