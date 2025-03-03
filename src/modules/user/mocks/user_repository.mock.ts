import { IUserRepository } from "../interfaces/user_repository.interface";
import { mockUserEntity } from "./user_entity.mock";

const mockUserRepository: IUserRepository = {
  findUsers: jest.fn().mockResolvedValue([]),
  findByUserId: jest.fn().mockResolvedValue(mockUserEntity),
  findByEmail: jest.fn().mockResolvedValue(null),
  findPermissions: jest.fn().mockResolvedValue([]),
  createUser: jest.fn().mockResolvedValue(mockUserEntity),
  changePassword: jest.fn().mockResolvedValue(null),
  updateUser: jest.fn().mockResolvedValue(null),
  inactiveUser: jest.fn().mockResolvedValue(null),
  activeUser: jest.fn().mockResolvedValue(null),
  disableUser: jest.fn().mockResolvedValue(null),
  enableUser: jest.fn().mockResolvedValue(null),
  deleteUser: jest.fn().mockResolvedValue(null),
};

export { mockUserRepository };
