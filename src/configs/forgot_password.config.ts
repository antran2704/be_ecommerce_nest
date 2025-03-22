import { registerAs } from "@nestjs/config";

export default registerAs("forgotPassword", () => ({
  expiresIn: process.env.FORGOT_PASSWORD_EXPIRES_IN,
}));
