import { registerAs } from "@nestjs/config";

export default registerAs("mail", () => ({
  registerToken: process.env.REGISTER_TOKEN,
  defaultMail: process.env.DEFAULT_EMAIL,
  password: process.env.PASSWORD_EMAIL,
}));
