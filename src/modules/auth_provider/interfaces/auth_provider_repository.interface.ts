import CreateAuthProviderDto from "../dtos/repositories/create_auth_provider.dto";
import GetAuthProviderDto from "../dtos/repositories/get_auth_provider.dto";
import { AuthProviderEntity } from "../entities/auth_provider.entity";

export interface IAuthProviderRepository {
  createAuthProvider(data: CreateAuthProviderDto): Promise<void>;
  getAuthProvider(data: GetAuthProviderDto): Promise<AuthProviderEntity>;
}
