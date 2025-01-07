import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";

import { Admin } from "../entities/admin.entity";
import { AuthAdminToken } from "../entities/auth_admin_token.entity";

import { CreateAdminDto } from "../dtos/create_admin.dto";
import { CreateSuperAdminDto } from "../dtos/create_super_admin.dto";
import { ADMIN_MESSAGES } from "../messages/admin.error";
import { AuthCommonService } from "src/common/auth/services/auth.service";
import {
  CreateSuccessResponse,
  GetSuccessWithPaginationResponse,
} from "src/common/response/success.response";
import { GetAdminReponseDto } from "../dtos/get_admin_response.dto";
import { PaginationSearchRequestDto } from "src/common/pagination/dtos";
import { IAdminService } from "../interfaces/admin_service.interface";
import { AdminRepository } from "../repositories/admin.repository";
import { AuthAdminTokenRepository } from "../repositories/authAdminToken.repository";

@Injectable()
export class AdminService implements IAdminService {
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly authAdminTokenRepository: AuthAdminTokenRepository,

    private readonly authCommonService: AuthCommonService,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async createUser(payload: CreateAdminDto): Promise<CreateSuccessResponse> {
    const isExitUser = await this.adminRepository.findByEmail(payload.email);

    if (isExitUser) {
      throw new BadRequestException(ADMIN_MESSAGES.USER_EXISTED);
    }

    const hashPassword = await this.authCommonService.hashPassword(
      payload.password,
    );

    const dataForSave: CreateAdminDto = {
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
    payload: CreateSuperAdminDto,
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

    const dataForSave: CreateAdminDto = {
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
    params: PaginationSearchRequestDto,
  ): Promise<GetSuccessWithPaginationResponse<GetAdminReponseDto[]>> {
    const { data, pagination } = await this.adminRepository.findAdmins(params);

    const formatData: GetAdminReponseDto[] = this.mapper.mapArray(
      data,
      Admin,
      GetAdminReponseDto,
    );

    return new GetSuccessWithPaginationResponse<any[]>(
      data,
      pagination,
    );
  }
}
