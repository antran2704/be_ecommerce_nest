import { INestApplication, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

class SwaggerApp {
  private readonly app: INestApplication;

  constructor(app: INestApplication) {
    this.app = app;
  }

  initial() {
    const appConfig = this.app.get(ConfigService);
    const PATH = appConfig.get('swagger.path');
    const PORT = appConfig.get('app.port');
    const HOST = appConfig.get('app.host');

    const swaggerConfig = new DocumentBuilder()
      .setTitle(appConfig.get('swagger.title') || 'API Documentation')
      .setDescription(
        appConfig.get('swagger.description') || 'API Documentation',
      )
      .setVersion(appConfig.get('swagger.version') || '1.0')
      .addBearerAuth()
      .build();
    const documentFactory = () =>
      SwaggerModule.createDocument(this.app, swaggerConfig);

    SwaggerModule.setup(PATH, this.app, documentFactory ,{
      swaggerOptions: {
        persistAuthorization: true,
        displayRequestDuration: true,
        filter: true,
        syntaxHighlight: {
          activate: true,
          theme: 'arta',
        },
      },
    });
    Logger.log(`Swagger is running on ${HOST}:${PORT}/${PATH}`, 'Swagger');
  }
}

export default SwaggerApp;
