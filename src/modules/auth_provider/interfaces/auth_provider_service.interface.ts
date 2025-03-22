import { GetAuthProviderDto } from "../dtos/repositories";
import {
  CreateAuthProviderRequestDto,
  CreateAuthProviderSystemRequestDto,
} from "../dtos/services";
import { AuthProviderEntity } from "../entities/auth_provider.entity";

export interface IAuthProviderService {
  createAuthProvider(data: CreateAuthProviderRequestDto): Promise<void>;
  createAuthProviderSystem(
    data: CreateAuthProviderSystemRequestDto,
  ): Promise<void>;
  getAuthProvider(data: GetAuthProviderDto): Promise<AuthProviderEntity>;
}
