import { BadRequestException, Injectable } from "@nestjs/common";
import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";

import { AuthCommonService } from "~/common/auth/services/auth.service";

import { IEntitesAndPaginationReponse } from "~/common/pagination/interfaces/pagination.interface";
import { UserAuthTokenService } from "~/modules/auth_token/services";
import { IUserService } from "../interfaces/user_service.interface";
import { UserRepository } from "../repositories/user.repository";
import {
  ChangePasswordUserRequestDto,
  CreateUserDto,
  CreateUserRequestDto,
  GetUserResponseDto,
  IsExitUserRequestDto,
  ResetPasswordRequestDto,
  SearchUserRequestDto,
  SignupUserPasswordRequestDto,
  SignupUserRequestDto,
  SignupUserWithProviderRequestDto,
  UpdateUserDto,
  UpdateUserRequestDto,
} from "../dtos";
import { USER_MESSAGES } from "../messages/user.error";
import { UserEntity } from "../entities/user.entity";
import { AuthProviderService } from "~/modules/auth_provider/services/auth_provider.service";
import { CartService } from "~/modules/cart/services/cart.service";
import { ENUM_CARD_STATUS } from "~/modules/cart/enums/cart.enum";
import { ENUM_AUTH_PROVIDER } from "~/modules/auth_provider/enums/provider.enum";

@Injectable()
export class UserService implements IUserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authTokenService: UserAuthTokenService,

    private readonly authCommonService: AuthCommonService,
    private readonly authProviderService: AuthProviderService,

    private readonly cartService: CartService,

    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async createUserByAdmin(payload: CreateUserRequestDto): Promise<void> {
    const user = await this.userRepository.findByEmail(payload.email);

    if (user) {
      const provider = await this.authProviderService.getAuthProvider({
        userId: user.id,
        provider: ENUM_AUTH_PROVIDER.SYSTEM,
      });

      if (provider) throw new BadRequestException(USER_MESSAGES.USER_EXISTED);
    }

    const hashPassword = await this.authCommonService.hashData(
      payload.password,
    );

    const formatData: CreateUserDto = {
      ...payload,
      password: hashPassword,
      is_active: true,
    };

    // save user
    const newUser = await this.userRepository.createUser(formatData);

    // save auth token of user
    await this.authTokenService.create(newUser);

    // save auth provider of user
    await this.authProviderService.createAuthProviderSystem({
      userId: newUser.id,
    });

    // create cart
    this.cartService.createCart({
      user: newUser,
      status: ENUM_CARD_STATUS.ACTIVE,
    });
  }

  async createUserWithSystem(payload: SignupUserRequestDto): Promise<string> {
    const user = await this.userRepository.findByEmail(payload.email);

    if (user) {
      const provider = await this.authProviderService.getAuthProvider({
        userId: user.id,
        provider: ENUM_AUTH_PROVIDER.SYSTEM,
      });

      if (provider) throw new BadRequestException(USER_MESSAGES.USER_EXISTED);
    }

    const formatData: CreateUserDto = {
      email: payload.email,
      is_active: false,
    };

    // save user
    const newUser = await this.userRepository.createUser(formatData);

    // save auth token of user
    await this.authTokenService.create(newUser);

    // save auth provider of user
    this.authProviderService.createAuthProviderSystem({ userId: newUser.id });

    // create cart inactive
    this.cartService.createCart({
      user: newUser,
      status: ENUM_CARD_STATUS.INACTIVE,
    });

    return newUser.id;
  }

  async createUserWithProvider(
    payload: SignupUserWithProviderRequestDto,
  ): Promise<string> {
    const formatData: CreateUserDto = {
      email: payload.email,
      is_active: true,
    };

    // save user
    const newUser = await this.userRepository.createUser(formatData);

    // save auth token of user
    await this.authTokenService.create(newUser);

    // save auth provider of user
    this.authProviderService.createAuthProvider({
      provider: payload.provider,
      userId: newUser.id,
      providerId: payload.providerId,
    });

    // create cart
    this.cartService.createCart({
      user: newUser,
      status: ENUM_CARD_STATUS.ACTIVE,
    });

    return newUser.id;
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
    return await this.userRepository.findByEmail(email);
  }

  async isExitUser(payload: IsExitUserRequestDto): Promise<boolean> {
    const user = await this.userRepository.findByEmail(payload.email);

    if (user) {
      const provider = await this.authProviderService.getAuthProvider({
        userId: user.id,
        provider: payload.provider,
      });

      if (!provider) return false;
    }

    return true;
  }

  async updateUser(id: string, payload: UpdateUserRequestDto): Promise<void> {
    const isExitUser = await this.userRepository.findByUserId(id);

    if (!isExitUser) {
      throw new BadRequestException(USER_MESSAGES.USER_NOT_FOUND);
    }

    const formatData: UpdateUserDto = {
      ...payload,
    };

    await this.userRepository.updateUser(id, formatData);
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

  async signupPassword(id: string, data: SignupUserPasswordRequestDto) {
    const user = await this.userRepository.findByUserId(id);

    if (!user) {
      throw new BadRequestException(USER_MESSAGES.USER_NOT_FOUND);
    }

    const hashPassword = await this.authCommonService.hashData(data.password);

    await this.userRepository.changePassword(id, hashPassword);
  }

  async enableUser(id: string): Promise<void> {
    const user = await this.userRepository.findByUserId(id);

    if (!user) {
      throw new BadRequestException(USER_MESSAGES.USER_NOT_FOUND);
    }

    if (!user.is_banned) {
      throw new BadRequestException(USER_MESSAGES.USER_WAS_ENABLED);
    }

    await this.userRepository.enableUser(id);
  }

  async disableUser(id: string): Promise<void> {
    const user = await this.userRepository.findByUserId(id);

    if (!user) {
      throw new BadRequestException(USER_MESSAGES.USER_NOT_FOUND);
    }

    if (user.is_banned) {
      throw new BadRequestException(USER_MESSAGES.USER_WAS_DISABLED);
    }

    await this.userRepository.disableUser(id);
  }

  async activeUser(id: string): Promise<void> {
    const user = await this.userRepository.findByUserId(id);

    if (!user) {
      throw new BadRequestException(USER_MESSAGES.USER_NOT_FOUND);
    }

    if (user.is_active) {
      throw new BadRequestException(USER_MESSAGES.USER_WAS_ACTIVED);
    }

    await this.userRepository.activeUser(id);
  }

  async inactiveUser(id: string): Promise<void> {
    const user = await this.userRepository.findByUserId(id);

    if (!user) {
      throw new BadRequestException(USER_MESSAGES.USER_NOT_FOUND);
    }

    if (!user.is_active) {
      throw new BadRequestException(USER_MESSAGES.USER_WAS_INACTIVED);
    }

    await this.userRepository.inactiveUser(id);
  }

  async deleteUser(id: string): Promise<void> {
    const isExitUser = await this.userRepository.findByUserId(id);

    if (!isExitUser) {
      throw new BadRequestException(USER_MESSAGES.USER_NOT_FOUND);
    }

    await this.userRepository.deleteUser(id);
  }
}
