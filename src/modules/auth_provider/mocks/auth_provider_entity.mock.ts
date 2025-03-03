import { AuthProviderEntity } from "../entities/auth_provider.entity";
import { ENUM_AUTH_PROVIDER } from "../enums/provider.enum";

const mockAuthProviderEntity: Partial<AuthProviderEntity> = {
  id: "123",
  provider: ENUM_AUTH_PROVIDER.SYSTEM,
  provider_id: "123",
  user_id: "123",
};

export { mockAuthProviderEntity };
