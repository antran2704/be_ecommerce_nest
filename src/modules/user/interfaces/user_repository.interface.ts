import { UserEntity } from "../entities/user.entity";
import {
  CreateUserDto,
  SearchUserRequestDto,
  SignupUserDto,
  UpdateUserDto,
} from "../dtos";
import { IEntitesAndPaginationReponse } from "src/common/pagination/interfaces/pagination.interface";

export interface IUserRepository {
  createUserByAdmin(payload: CreateUserDto): Promise<UserEntity>;
  createUser(payload: SignupUserDto): Promise<UserEntity>;

  findByUserId(id: string): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserEntity>;
  findUsers(
    params: SearchUserRequestDto,
  ): Promise<IEntitesAndPaginationReponse<UserEntity>>;

  findPermissions(id: string): Promise<UserEntity>;

  updateUser(id: string, payload: UpdateUserDto): Promise<void>;
  enableUser(id: string): Promise<void>;
  disableUser(id: string): Promise<void>;
  activeUser(id: string): Promise<void>;
  inactiveUser(id: string): Promise<void>;
  changePassword(id: string, password: string): Promise<void>;

  deleteUser(id: string): Promise<void>;
}
