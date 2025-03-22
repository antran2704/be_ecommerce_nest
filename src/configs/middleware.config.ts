import { registerAs } from "@nestjs/config";

export default registerAs("middleware", () => ({
  cors: {
    allowMethod: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"],
    allowOrigin: process.env.ALLOW_ORIGIN
      ? process.env.ALLOW_ORIGIN.split(",")
      : "*",
    allowHeader: [
      "Accept",
      "Accept-Language",
      "Content-Language",
      "Content-Type",
      "Origin",
      "Authorization",
      "Access-Control-Request-Method",
      "Access-Control-Request-Headers",
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Origin",
      "Access-Control-Allow-Methods",
      "Access-Control-Allow-Credentials",
      "Access-Control-Expose-Headers",
      "Access-Control-Max-Age",
      "Referer",
      "Host",
      "X-Requested-With",
      "x-custom-lang",
      "x-timestamp",
      "x-api-key",
      "x-timezone",
      "X-Lang",
      "x-request-id",
      "x-version",
      "x-repo-version",
      "X-Response-Time",
      "user-agent",
      "x-locale",
      "x-device-id",
    ],
  },
}));
