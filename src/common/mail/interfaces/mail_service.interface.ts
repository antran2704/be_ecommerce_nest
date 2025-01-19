import { IInitContextMail, IOtpForgotPassword } from "./index";

interface IMailService {
  getDefaultContext(): IInitContextMail;
  sendOtpForgotPassword(data: IOtpForgotPassword): Promise<void>;
}

export default IMailService;
