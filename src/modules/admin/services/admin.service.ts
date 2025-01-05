import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository, SelectQueryBuilder } from "typeorm";
import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";

import { Admin } from "../entities/admin";
import { CreateAdminDto } from "../dtos/create_admin.dto";
import { CreateSuperAdminDto } from "../dtos/create_super_admin.dto";
import { ADMIN_MESSAGES } from "../messages/admin.error";
import { AuthCommonService } from "src/common/auth/services/auth.service";
import {
  CreateSuccessResponse,
  GetSuccessWithPaginationResponse,
} from "src/common/response/success.response";
import { GetAdminReponseDto } from "../dtos/get_admin_response.dto";
import { getEntitesAndPagination } from "src/common/pagination/helpers/pagination";
import { PaginationSearchRequestDto } from "src/common/pagination/dtos";

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly userRepository: Repository<Admin>,
    private readonly authCommonService: AuthCommonService,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async createUser(payload: CreateAdminDto): Promise<CreateSuccessResponse> {
    const isExitUser = await this.userRepository.findOneBy({
      email: payload.email,
    });

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

    const user = this.userRepository.create(dataForSave);
    return await this.userRepository.save(user).then(() => {
      return new CreateSuccessResponse();
    });
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

    const isExitUser = await this.userRepository.findOneBy({
      email: payload.email,
    });

    if (isExitUser) {
      throw new BadRequestException(ADMIN_MESSAGES.USER_EXISTED);
    }

    const hashPassword =
      await this.authCommonService.hashPassword(defaultPassword);

    const dataForSave: CreateAdminDto = {
      ...payload,
      password: hashPassword,
    };

    const user = this.userRepository.create({ ...dataForSave, isAdmin: true });
    return await this.userRepository.save(user).then(() => {
      return new CreateSuccessResponse(
        ADMIN_MESSAGES.CREATE_SUPER_ADMIN_SUCCESS,
      );
    });
  }

  async getAdmins(
    params: PaginationSearchRequestDto,
  ): Promise<GetSuccessWithPaginationResponse<GetAdminReponseDto[]>> {
    const { data, pagination } = await getEntitesAndPagination(
      this.userRepository,
      params,
      (query, originalNameEntity) => {
        if (params.search) {
          query.where(`${originalNameEntity}.email LIKE :email`, {
            email: `%${params.search}%`,
          });
        }
      },
    );

    const formatData: GetAdminReponseDto[] = this.mapper.mapArray(
      data,
      Admin,
      GetAdminReponseDto,
    );

    return new GetSuccessWithPaginationResponse<GetAdminReponseDto[]>(
      formatData,
      pagination,
    );
  }
}
