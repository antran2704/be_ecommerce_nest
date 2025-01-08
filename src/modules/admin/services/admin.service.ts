import { BadRequestException, Injectable } from "@nestjs/common";
import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";

import { Admin } from "../entities/admin.entity";

import { ADMIN_MESSAGES } from "../messages/admin.error";
import { AuthCommonService } from "src/common/auth/services/auth.service";
import {
  CreateSuccessResponse,
  DeletedSuccessResponse,
  GetSuccessWithPaginationResponse,
  UpdatedSuccessResponse,
} from "src/common/response/success.response";
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

@Injectable()
export class AdminService implements IAdminService {
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly authAdminTokenRepository: AuthAdminTokenRepository,

    private readonly authCommonService: AuthCommonService,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async createUser(
    payload: CreateAdminRequestDto,
  ): Promise<CreateSuccessResponse> {
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
    const userId = await this.adminRepository.createAdmin(dataForSave);

    // save auth token of user
    await this.authAdminTokenRepository.create(userId);

    return new CreateSuccessResponse();
  }

  async createSuperUser(
    payload: CreateSuperAdminRequestDto,
  ): Promise<CreateSuccessResponse> {
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
    const userId = await this.adminRepository.createAdmin(dataForSave);

    // save auth token of user
    await this.authAdminTokenRepository.create(userId);

    return new CreateSuccessResponse(ADMIN_MESSAGES.CREATE_SUPER_ADMIN_SUCCESS);
  }

  async getAdmins(
    params: SearchAdminsRequestDto,
  ): Promise<GetSuccessWithPaginationResponse<GetAdminResponseDto[]>> {
    const { data, pagination } = await this.adminRepository.findAdmins(params);

    const formatData: GetAdminResponseDto[] = this.mapper.mapArray(
      data,
      Admin,
      GetAdminResponseDto,
    );

    return new GetSuccessWithPaginationResponse<GetAdminResponseDto[]>(
      formatData,
      pagination,
    );
  }

  async updateAdmin(
    id: string,
    payload: UpdateAdminRequestDto,
  ): Promise<UpdatedSuccessResponse> {
    const isExitUser = await this.adminRepository.findByUserId(id);

    if (!isExitUser) {
      throw new BadRequestException(ADMIN_MESSAGES.ADMIN_NOT_FOUND);
    }

    await this.adminRepository.updateAdmin(id, payload);

    return new UpdatedSuccessResponse();
  }

  async changePassword(
    id: string,
    data: ChangePasswordAdminRequestDto,
  ): Promise<UpdatedSuccessResponse> {
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

    return new UpdatedSuccessResponse();
  }

  async enableAdmin(id: string): Promise<UpdatedSuccessResponse> {
    const user = await this.adminRepository.findByUserId(id);

    if (!user) {
      throw new BadRequestException(ADMIN_MESSAGES.ADMIN_NOT_FOUND);
    }

    if (user.is_active) {
      throw new BadRequestException(ADMIN_MESSAGES.USER_WAS_ENABLED);
    }

    await this.adminRepository.enableAdmin(id);

    return new UpdatedSuccessResponse();
  }

  async disableAdmin(id: string): Promise<UpdatedSuccessResponse> {
    const user = await this.adminRepository.findByUserId(id);

    if (!user) {
      throw new BadRequestException(ADMIN_MESSAGES.ADMIN_NOT_FOUND);
    }

    if (!user.is_active) {
      throw new BadRequestException(ADMIN_MESSAGES.USER_WAS_DISABLED);
    }

    await this.adminRepository.disableAdmin(id);

    return new UpdatedSuccessResponse();
  }

  async deleteAdmin(id: string): Promise<DeletedSuccessResponse> {
    const isExitUser = await this.adminRepository.findByUserId(id);

    if (!isExitUser) {
      throw new BadRequestException(ADMIN_MESSAGES.ADMIN_NOT_FOUND);
    }

    await this.adminRepository.deleteAdmin(id);

    return new DeletedSuccessResponse();
  }
}
