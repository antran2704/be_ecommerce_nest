import { IsOptional, IsString } from "class-validator";

export default class GetAuthProviderDto {
  @IsOptional()
  @IsString()
  providerId: string;
}
