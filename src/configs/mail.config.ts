import { registerAs } from "@nestjs/config";

export default registerAs("mail", () => ({
  registerToken: process.env.REGISTER_MAIL_TOKEN,
  defaultMail: process.env.DEFAULT_EMAIL,
  password: process.env.PASSWORD_EMAIL,
  addressForm: process.env.ADDRESS_FORM_EMAIL,
  phoneForm: process.env.PHONE_FORM_EMAIL,
  customerName: process.env.CUSTOMER_NAME_EMAIL,
}));
