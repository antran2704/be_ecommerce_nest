import { BadRequestException, Injectable } from "@nestjs/common";
import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";

import { AdminEntity } from "../entities/admin.entity";

import { ADMIN_MESSAGES } from "../messages/admin.error";
import { AuthCommonService } from "src/common/auth/services/auth.service";
import { IAdminService } from "../interfaces/admin_service.interface";
import { AdminRepository } from "../repositories/admin.repository";
import {
  ChangePasswordAdminRequestDto,
  CreateAdminDto,
  CreateAdminRequestDto,
  CreateSuperAdminRequestDto,
  GetAdminPermissionResponseDto,
  GetAdminResponseDto,
  ResetPasswordRequestDto,
  SearchAdminsRequestDto,
  UpdateAdminDto,
  UpdateAdminRequestDto,
} from "../dtos";
import { IEntitesAndPaginationReponse } from "src/common/pagination/interfaces/pagination.interface";
import { RoleService } from "src/modules/role/services/role.service";
import { ENUM_PERMISSION } from "src/modules/permissions/enums/permission.enum";
import { AuthTokenService } from "src/modules/auth_token/services/auth_token.service";

@Injectable()
export class AdminService implements IAdminService {
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly authTokenService: AuthTokenService,
    private readonly roleService: RoleService,

    private readonly authCommonService: AuthCommonService,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async createUser(payload: CreateAdminRequestDto): Promise<void> {
    const isExitUser = await this.adminRepository.findByEmail(payload.email);

    if (isExitUser) {
      throw new BadRequestException(ADMIN_MESSAGES.USER_EXISTED);
    }

    const role = await this.roleService.getRoleEntity(payload.role);

    const hashPassword = await this.authCommonService.hashData(
      payload.password,
    );

    const dataForSave: CreateAdminDto = {
      ...payload,
      password: hashPassword,
      role,
    };

    // save user
    const newUser = await this.adminRepository.createAdmin(dataForSave);

    // save auth token of user
    await this.authTokenService.create(newUser);
  }

  async createSuperUser(payload: CreateSuperAdminRequestDto): Promise<void> {
    const godKey = process.env.CREATE_GOD_USER_KEY;
    const defaultPassword = process.env.PASSWORD_GOD_USER;

    // check config in env file
    if (!godKey || !defaultPassword)
      throw new BadRequestException(ADMIN_MESSAGES.MISSING_CONFIG_GOD_USER);

    // check god key in payload
    if (godKey !== payload.godKey)
      throw new BadRequestException(ADMIN_MESSAGES.GOD_KEY_INVALID);

    const isExitUser = await this.adminRepository.findByEmail(payload.email);

    if (isExitUser) {
      throw new BadRequestException(ADMIN_MESSAGES.USER_EXISTED);
    }

    const hashPassword = await this.authCommonService.hashData(defaultPassword);

    const dataForSave: CreateAdminDto = {
      ...payload,
      password: hashPassword,
      role: null,
    };

    // save user
    const newUser = await this.adminRepository.createAdmin(dataForSave);

    // save auth token of user
    await this.authTokenService.create(newUser);
  }

  async getAdmins(
    params: SearchAdminsRequestDto,
  ): Promise<IEntitesAndPaginationReponse<GetAdminResponseDto>> {
    const { data, pagination } = await this.adminRepository.findAdmins(params);

    const formatData: GetAdminResponseDto[] = this.mapper.mapArray(
      data,
      AdminEntity,
      GetAdminResponseDto,
    );

    return { data: formatData, pagination };
  }

  async getAdminById(id: string): Promise<GetAdminResponseDto> {
    const user = await this.adminRepository.findByUserId(id);

    if (!user) {
      throw new BadRequestException(ADMIN_MESSAGES.USER_NOT_FOUND);
    }

    const result: GetAdminResponseDto = this.mapper.map(
      user,
      AdminEntity,
      GetAdminResponseDto,
    );

    return result;
  }

  async getAdminEntityById(id: string): Promise<AdminEntity> {
    const user = await this.adminRepository.findByUserId(id);

    if (!user) {
      throw new BadRequestException(ADMIN_MESSAGES.USER_NOT_FOUND);
    }

    return user;
  }

  async getAdminEntityByEmail(email: string): Promise<AdminEntity> {
    const user = await this.adminRepository.findByEmail(email);

    if (!user) {
      throw new BadRequestException(ADMIN_MESSAGES.USER_NOT_FOUND);
    }

    return user;
  }

  async getAdminPermissions(
    id: string,
  ): Promise<GetAdminPermissionResponseDto> {
    const user = await this.adminRepository.findPermissions(id);

    if (!user) {
      throw new BadRequestException(ADMIN_MESSAGES.USER_NOT_FOUND);
    }

    return { permissions: (user.role.permissions as ENUM_PERMISSION[]) || [] };
  }

  async updateAdmin(id: string, payload: UpdateAdminRequestDto): Promise<void> {
    const isExitUser = await this.adminRepository.findByUserId(id);

    if (!isExitUser) {
      throw new BadRequestException(ADMIN_MESSAGES.USER_NOT_FOUND);
    }

    const role = await this.roleService.getRoleEntity(payload.role);

    const dataForSave: UpdateAdminDto = {
      ...payload,
      role,
    };

    await this.adminRepository.updateAdmin(id, dataForSave);
  }

  async changePassword(
    id: string,
    data: ChangePasswordAdminRequestDto,
  ): Promise<void> {
    const user = await this.adminRepository.findByUserId(id);

    if (!user) {
      throw new BadRequestException(ADMIN_MESSAGES.USER_NOT_FOUND);
    }

    const isMatchPassword = await this.authCommonService.compareHashData(
      data.password,
      user.password,
    );

    if (!isMatchPassword) {
      throw new BadRequestException(ADMIN_MESSAGES.PASSWORD_INCORRECT);
    }

    const hashPassword = await this.authCommonService.hashData(data.password);

    await this.adminRepository.changePassword(id, hashPassword);
  }

  async resetPassword(id: string, data: ResetPasswordRequestDto) {
    const user = await this.adminRepository.findByUserId(id);

    if (!user) {
      throw new BadRequestException(ADMIN_MESSAGES.USER_NOT_FOUND);
    }

    const hashPassword = await this.authCommonService.hashData(
      data.newPassword,
    );

    await this.adminRepository.changePassword(id, hashPassword);
  }

  async enableAdmin(id: string): Promise<void> {
    const user = await this.adminRepository.findByUserId(id);

    if (!user) {
      throw new BadRequestException(ADMIN_MESSAGES.USER_NOT_FOUND);
    }

    if (user.is_active) {
      throw new BadRequestException(ADMIN_MESSAGES.USER_WAS_ENABLED);
    }

    await this.adminRepository.enableAdmin(id);
  }

  async disableAdmin(id: string): Promise<void> {
    const user = await this.adminRepository.findByUserId(id);

    if (!user) {
      throw new BadRequestException(ADMIN_MESSAGES.USER_NOT_FOUND);
    }

    if (!user.is_active) {
      throw new BadRequestException(ADMIN_MESSAGES.USER_WAS_DISABLED);
    }

    await this.adminRepository.disableAdmin(id);
  }

  async deleteAdmin(id: string): Promise<void> {
    const isExitUser = await this.adminRepository.findByUserId(id);

    if (!isExitUser) {
      throw new BadRequestException(ADMIN_MESSAGES.USER_NOT_FOUND);
    }

    await this.adminRepository.deleteAdmin(id);
  }
}
