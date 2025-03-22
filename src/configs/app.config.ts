import { registerAs } from "@nestjs/config";

export default registerAs("app", () => ({
  name: process.env.APP_NAME,
  env: process.env.APP_ENV,
  version: process.env.APP_VERSION,
  apiVersion: process.env.APP_API_VERSION,
  globalPrefix: process.env.APP_API_PREFIX,
  port: process.env.APP_PORT || 3000,
  host: process.env.APP_HOST,
}));
