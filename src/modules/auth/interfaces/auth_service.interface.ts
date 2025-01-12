import {
  LoginRequestDto,
  LoginResponseDto,
  NewAccessTokenResponseDto,
} from "../dtos";

export interface IAuthService {
  login(data: LoginRequestDto): Promise<LoginResponseDto>;
  getNewAccessToken(data: any): Promise<NewAccessTokenResponseDto>;
}
