import { IUserAuthTokenService } from "../interfaces/user_auth_token_service.interface";
import { mockAuthTokenEntity } from "./auth_token_entity.mock";

const mockUserAuthTokenRepository: IUserAuthTokenService = {
  create: jest.fn().mockReturnValue(mockAuthTokenEntity),
  getAuthTokenByUserId: jest.fn().mockReturnValue(null),
  updateForgotOtp: jest.fn().mockReturnValue(null),
  updateRefreshToken: jest.fn().mockReturnValue(null),
  updateSignupOtp: jest.fn().mockReturnValue(null),
};

export { mockUserAuthTokenRepository };
