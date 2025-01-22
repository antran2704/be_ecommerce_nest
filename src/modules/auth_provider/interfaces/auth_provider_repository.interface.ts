import {
  CreateAuthProviderDto,
  GetAuthProviderDto,
} from "../dtos/repositories";
import { AuthProviderEntity } from "../entities/auth_provider.entity";

export interface IAuthProviderRepository {
  createAuthProvider(data: CreateAuthProviderDto): Promise<void>;
  getAuthProvider(data: GetAuthProviderDto): Promise<AuthProviderEntity>;
}
