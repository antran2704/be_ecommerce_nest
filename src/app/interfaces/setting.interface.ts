import { INestApplication } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

interface ISettingApp {
  globalPrefix: (app: INestApplication, configService: ConfigService) => void;
  cors: (app: INestApplication, configService: ConfigService) => void;
  viewEngine: () => void;
}

export type { ISettingApp };
