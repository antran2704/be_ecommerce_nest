import {
  LoginRequestDto,
  LoginResponseDto,
  LogoutRequestDto,
  NewAccessTokenResponseDto,
} from "../dtos";

export interface IAuthService {
  login(data: LoginRequestDto): Promise<LoginResponseDto>;
  logout(payload: LogoutRequestDto): Promise<void>;
  getNewAccessToken(data: any): Promise<NewAccessTokenResponseDto>;
}
