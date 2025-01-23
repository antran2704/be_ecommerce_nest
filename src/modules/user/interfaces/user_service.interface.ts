import {
  ChangePasswordUserRequestDto,
  CreateUserRequestDto,
  GetUserResponseDto,
  SearchUserRequestDto,
  SignupUserPasswordRequestDto,
  SignupUserRequestDto,
} from "../dtos";
import { IEntitesAndPaginationReponse } from "src/common/pagination/interfaces/pagination.interface";
import { UserEntity } from "../entities/user.entity";
import { ResetPasswordRequestDto } from "src/modules/admin/dtos";

export interface IUserService {
  createUserWithSystem(payload: SignupUserRequestDto): Promise<string>;
  createUserWithProvider(payload: CreateUserRequestDto): Promise<void>;
  createUserByAdmin(payload: CreateUserRequestDto): Promise<void>;
  getUsers(
    params: SearchUserRequestDto,
  ): Promise<IEntitesAndPaginationReponse<GetUserResponseDto>>;

  getUserById(id: string): Promise<GetUserResponseDto>;

  getUserEntityById(id: string): Promise<UserEntity>;
  getUserEntityByEmail(id: string): Promise<UserEntity>;

  updateUser(id: string, payload: CreateUserRequestDto): Promise<void>;

  enableUser(id: string): Promise<void>;
  disableUser(id: string): Promise<void>;
  activeUser(id: string): Promise<void>;
  inactiveUser(id: string): Promise<void>;

  changePassword(id: string, data: ChangePasswordUserRequestDto): Promise<void>;
  signupPassword(id: string, data: SignupUserPasswordRequestDto): Promise<void>;
  resetPassword(id: string, data: ResetPasswordRequestDto): Promise<void>;

  deleteUser(id: string): Promise<void>;
}
