import { Injectable } from "@nestjs/common";
import { MailerService as NestMailerService } from "@nestjs-modules/mailer";
import { ConfigService } from "@nestjs/config";

import {
  IInitContextMail,
  IMailService,
  IForgotPasswordOtp,
  ISignupUserOtp,
} from "../interfaces";
import TEMPLATE_EMAIL from "../common/template";

@Injectable()
export class MailService implements IMailService {
  private readonly address: string;
  private readonly phoneNumber: string;
  private readonly customerName: string;
  private readonly email: string;

  constructor(
    private readonly nestMailService: NestMailerService,
    private configService: ConfigService,
  ) {
    this.address = configService.get("mail.addressForm");
    this.phoneNumber = configService.get("mail.phoneForm");
    this.customerName = configService.get("mail.customerName");
    this.email = configService.get("mail.defaultMail");
  }

  getDefaultContext(): IInitContextMail {
    return {
      customerName: this.customerName,
      address: this.address,
      phoneNumber: this.phoneNumber,
      customerMail: this.email,
      currentYear: new Date().getFullYear(),
    };
  }

  async sendOtpForgotPassword(data: IForgotPasswordOtp): Promise<void> {
    this.nestMailService.sendMail({
      from: "Antran",
      to: data.toEmail,
      subject: "Forgot password",
      template: TEMPLATE_EMAIL.OTP_FORGOT_PASSWORD,
      context: {
        otp: data.otp,
        email: data.toEmail,
        ...this.getDefaultContext(),
      },
    });
  }

  async sendOtpSignupUser(data: ISignupUserOtp): Promise<void> {
    this.nestMailService.sendMail({
      from: "Antran",
      to: data.toEmail,
      subject: "Signup",
      template: TEMPLATE_EMAIL.OTP_SIGNUP_USER,
      context: {
        otp: data.otp,
        email: data.toEmail,
        ...this.getDefaultContext(),
      },
    });
  }
}
