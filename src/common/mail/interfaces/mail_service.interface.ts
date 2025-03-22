import { IInitContextMail, IForgotPasswordOtp, ISignupUserOtp } from "./index";

interface IMailService {
  getDefaultContext(): IInitContextMail;
  sendOtpForgotPassword(data: IForgotPasswordOtp): Promise<void>;
  sendOtpSignupUser(data: ISignupUserOtp): Promise<void>;
}

export default IMailService;
