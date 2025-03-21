import { AuthTokenEntity } from "../entities/auth_token.entity";

const mockAuthTokenEntity: Partial<AuthTokenEntity> = {
  admin: null,
  user: null,
  id: "123",
  refresh_token: "",
  forgot_otp: "",
  forgot_otp_expire_at: "",
  signup_otp: "",
  signup_otp_expire_at: "",
};

export { mockAuthTokenEntity };
