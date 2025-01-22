import { BadRequestException, Injectable } from "@nestjs/common";
import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";

import { AuthCommonService } from "src/common/auth/services/auth.service";

import { IEntitesAndPaginationReponse } from "src/common/pagination/interfaces/pagination.interface";
import { UserAuthTokenService } from "src/modules/auth_token/services";
import { IUserService } from "../interfaces/user_service.interface";
import { UserRepository } from "../repositories/user.repository";
import {
  ChangePasswordUserRequestDto,
  CreateUserDto,
  CreateUserRequestDto,
  GetUserResponseDto,
  ResetPasswordRequestDto,
  SearchUserRequestDto,
  UpdateUserDto,
  UpdateUserRequestDto,
} from "../dtos";
import { USER_MESSAGES } from "../messages/user.error";
import { UserEntity } from "../entities/user.entity";
import { AuthProviderService } from "src/modules/auth_provider/services/auth_provider.service";

@Injectable()
export class UserService implements IUserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authTokenService: UserAuthTokenService,

    private readonly authCommonService: AuthCommonService,
    private readonly authProviderService: AuthProviderService,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async createUserWithSystem(payload: CreateUserRequestDto): Promise<void> {
    const isExitUser = await this.userRepository.findByEmail(payload.email);

    if (isExitUser) {
      throw new BadRequestException(USER_MESSAGES.USER_EXISTED);
    }

    const hashPassword = await this.authCommonService.hashData(
      payload.password,
    );

    const dataForSave: CreateUserDto = {
      ...payload,
      password: hashPassword,
    };

    // save user
    const newUser = await this.userRepository.createUser(dataForSave);

    // save auth token of user
    await this.authTokenService.create(newUser);

    // save auth provider of user
    this.authProviderService.createAuthProviderSystem({ userId: newUser.id });
  }

  // TODO: implement this function
  async createUserWithProvider(payload: CreateUserRequestDto): Promise<void> {
    const isExitUser = await this.userRepository.findByEmail(payload.email);

    if (isExitUser) {
      throw new BadRequestException(USER_MESSAGES.USER_EXISTED);
    }
  }

  async getUsers(
    params: SearchUserRequestDto,
  ): Promise<IEntitesAndPaginationReponse<GetUserResponseDto>> {
    const { data, pagination } = await this.userRepository.findUsers(params);

    const formatData: GetUserResponseDto[] = this.mapper.mapArray(
      data,
      UserEntity,
      GetUserResponseDto,
    );

    return { data: formatData, pagination };
  }

  async getUserById(id: string): Promise<GetUserResponseDto> {
    const user = await this.userRepository.findByUserId(id);

    if (!user) {
      throw new BadRequestException(USER_MESSAGES.USER_NOT_FOUND);
    }

    const result: GetUserResponseDto = this.mapper.map(
      user,
      UserEntity,
      GetUserResponseDto,
    );

    return result;
  }

  async getUserEntityById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findByUserId(id);

    if (!user) {
      throw new BadRequestException(USER_MESSAGES.USER_NOT_FOUND);
    }

    return user;
  }

  async getUserEntityByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new BadRequestException(USER_MESSAGES.USER_NOT_FOUND);
    }

    return user;
  }

  async updateUser(id: string, payload: UpdateUserRequestDto): Promise<void> {
    const isExitUser = await this.userRepository.findByUserId(id);

    if (!isExitUser) {
      throw new BadRequestException(USER_MESSAGES.USER_NOT_FOUND);
    }

    const dataForSave: UpdateUserDto = {
      ...payload,
    };

    await this.userRepository.updateUser(id, dataForSave);
  }

  async changePassword(
    id: string,
    data: ChangePasswordUserRequestDto,
  ): Promise<void> {
    const user = await this.userRepository.findByUserId(id);

    if (!user) {
      throw new BadRequestException(USER_MESSAGES.USER_NOT_FOUND);
    }

    const isMatchPassword = await this.authCommonService.compareHashData(
      data.password,
      user.password,
    );

    if (!isMatchPassword) {
      throw new BadRequestException(USER_MESSAGES.PASSWORD_INCORRECT);
    }

    const hashPassword = await this.authCommonService.hashData(data.password);

    await this.userRepository.changePassword(id, hashPassword);
  }

  async resetPassword(id: string, data: ResetPasswordRequestDto) {
    const user = await this.userRepository.findByUserId(id);

    if (!user) {
      throw new BadRequestException(USER_MESSAGES.USER_NOT_FOUND);
    }

    const hashPassword = await this.authCommonService.hashData(
      data.newPassword,
    );

    await this.userRepository.changePassword(id, hashPassword);
  }

  async enableUser(id: string): Promise<void> {
    const user = await this.userRepository.findByUserId(id);

    if (!user) {
      throw new BadRequestException(USER_MESSAGES.USER_NOT_FOUND);
    }

    if (user.is_active) {
      throw new BadRequestException(USER_MESSAGES.USER_WAS_ENABLED);
    }

    await this.userRepository.enableUser(id);
  }

  async disableUser(id: string): Promise<void> {
    const user = await this.userRepository.findByUserId(id);

    if (!user) {
      throw new BadRequestException(USER_MESSAGES.USER_NOT_FOUND);
    }

    if (!user.is_active) {
      throw new BadRequestException(USER_MESSAGES.USER_WAS_DISABLED);
    }

    await this.userRepository.disableUser(id);
  }

  async deleteUser(id: string): Promise<void> {
    const isExitUser = await this.userRepository.findByUserId(id);

    if (!isExitUser) {
      throw new BadRequestException(USER_MESSAGES.USER_NOT_FOUND);
    }

    await this.userRepository.deleteUser(id);
  }
}
