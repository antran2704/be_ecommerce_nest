import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";

import { Admin } from "../entities/admin";
import { CreateAdminDto } from "../dtos/create_admin.dto";
import { CreateSuperAdminDto } from "../dtos/create_super_admin.dto";
import { ADMIN_MESSAGES } from "../messages/admin.error";
import { AuthCommonService } from "src/common/auth/services/auth.service";
import {
  CreateSuccessResponse,
  GetSuccessResponse,
} from "src/common/response/success.response";
import { GetAdminReponseDto } from "../dtos/get_admin_response.dto";

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

  async getAdmins(): Promise<GetSuccessResponse<GetAdminReponseDto[]>> {
    const users = await this.userRepository.find();

    const formatData: GetAdminReponseDto[] = this.mapper.mapArray(users, Admin, GetAdminReponseDto);
    return new GetSuccessResponse<GetAdminReponseDto[]>(formatData);
  }
}
