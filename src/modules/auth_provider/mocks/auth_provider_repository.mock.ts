import { IAuthProviderRepository } from "../interfaces/auth_provider_repository.interface";
import { mockAuthProviderEntity } from "./auth_provider_entity.mock";

const mockAuthProviderRepository: IAuthProviderRepository = {
  getAuthProvider: jest.fn().mockReturnValue(mockAuthProviderEntity),
  createAuthProvider: jest.fn().mockReturnValue(null),
};

export { mockAuthProviderRepository };
