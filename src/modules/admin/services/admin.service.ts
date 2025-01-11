import { BadRequestException, Injectable } from "@nestjs/common";
import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";

import { AdminEntity } from "../entities/admin.entity";

import { ADMIN_MESSAGES } from "../messages/admin.error";
import { AuthCommonService } from "src/common/auth/services/auth.service";
import { IAdminService } from "../interfaces/admin_service.interface";
import { AdminRepository } from "../repositories/admin.repository";
import { AuthAdminTokenRepository } from "../repositories/authAdminToken.repository";
import {
  ChangePasswordAdminRequestDto,
  CreateAdminRequestDto,
  CreateSuperAdminRequestDto,
  GetAdminResponseDto,
  SearchAdminsRequestDto,
  UpdateAdminRequestDto,
} from "../dtos";
import { IEntitesAndPaginationReponse } from "src/common/pagination/interfaces/pagination.interface";

@Injectable()
export class AdminService implements IAdminService {
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly authAdminTokenRepository: AuthAdminTokenRepository,

    private readonly authCommonService: AuthCommonService,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async createUser(payload: CreateAdminRequestDto): Promise<void> {
    const isExitUser = await this.adminRepository.findByEmail(payload.email);

    if (isExitUser) {
      throw new BadRequestException(ADMIN_MESSAGES.USER_EXISTED);
    }

    const hashPassword = await this.authCommonService.hashPassword(
      payload.password,
    );

    const dataForSave: CreateAdminRequestDto = {
      ...payload,
      password: hashPassword,
    };

    // save user
    const newUser = await this.adminRepository.createAdmin(dataForSave);

    // save auth token of user
    await this.authAdminTokenRepository.create(newUser);
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

    const hashPassword =
      await this.authCommonService.hashPassword(defaultPassword);

    const dataForSave: CreateAdminRequestDto = {
      ...payload,
      password: hashPassword,
    };

    // save user
    const newUser = await this.adminRepository.createAdmin(dataForSave);

    // save auth token of user
    await this.authAdminTokenRepository.create(newUser);
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

  async getAdmin(id: string): Promise<GetAdminResponseDto> {
    const user = await this.adminRepository.findByUserId(id);

    if (!user) {
      throw new BadRequestException(ADMIN_MESSAGES.ADMIN_NOT_FOUND);
    }

    const result: GetAdminResponseDto = this.mapper.map(
      user,
      AdminEntity,
      GetAdminResponseDto,
    );

    return result;
  }

  async updateAdmin(id: string, payload: UpdateAdminRequestDto): Promise<void> {
    const isExitUser = await this.adminRepository.findByUserId(id);

    if (!isExitUser) {
      throw new BadRequestException(ADMIN_MESSAGES.ADMIN_NOT_FOUND);
    }

    await this.adminRepository.updateAdmin(id, payload);
  }

  async changePassword(
    id: string,
    data: ChangePasswordAdminRequestDto,
  ): Promise<void> {
    const user = await this.adminRepository.findByUserId(id);

    if (!user) {
      throw new BadRequestException(ADMIN_MESSAGES.ADMIN_NOT_FOUND);
    }

    const isMatchPassword = await this.authCommonService.comparePassword(
      data.password,
      user.password,
    );

    if (!isMatchPassword) {
      throw new BadRequestException(ADMIN_MESSAGES.PASSWORD_INCORRECT);
    }

    const hashPassword = await this.authCommonService.hashPassword(
      data.password,
    );

    await this.adminRepository.changePassword(id, hashPassword);
  }

  async enableAdmin(id: string): Promise<void> {
    const user = await this.adminRepository.findByUserId(id);

    if (!user) {
      throw new BadRequestException(ADMIN_MESSAGES.ADMIN_NOT_FOUND);
    }

    if (user.is_active) {
      throw new BadRequestException(ADMIN_MESSAGES.USER_WAS_ENABLED);
    }

    await this.adminRepository.enableAdmin(id);
  }

  async disableAdmin(id: string): Promise<void> {
    const user = await this.adminRepository.findByUserId(id);

    if (!user) {
      throw new BadRequestException(ADMIN_MESSAGES.ADMIN_NOT_FOUND);
    }

    if (!user.is_active) {
      throw new BadRequestException(ADMIN_MESSAGES.USER_WAS_DISABLED);
    }

    await this.adminRepository.disableAdmin(id);
  }

  async deleteAdmin(id: string): Promise<void> {
    const isExitUser = await this.adminRepository.findByUserId(id);

    if (!isExitUser) {
      throw new BadRequestException(ADMIN_MESSAGES.ADMIN_NOT_FOUND);
    }

    await this.adminRepository.deleteAdmin(id);
  }
}
