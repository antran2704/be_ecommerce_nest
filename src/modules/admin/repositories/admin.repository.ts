import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { IAdminRepository } from "../interfaces/admin_repository.interface";
import { getEntitesAndPagination } from "src/common/pagination/helpers/pagination";
import PaginationResponseDto from "src/common/pagination/dtos/pagination_response.dto";
import { Admin } from "../entities/admin.entity";
import { GetDatabaseDefaultID } from "src/helpers/database";
import {
  CreateAdminRequestDto,
  SearchAdminsRequestDto,
  UpdateAdminRequestDto,
} from "../dtos";
import { ENUM_ADMIN_STATUS } from "../enums/admin.enum";

@Injectable()
export class AdminRepository implements IAdminRepository {
  constructor(
    @InjectRepository(Admin)
    private readonly adminEntity: Repository<Admin>,
  ) {}

  async createSuperUser(payload: CreateAdminRequestDto): Promise<Admin> {
    const userId = GetDatabaseDefaultID("AD");

    const user = this.adminEntity.create({
      ...payload,
      id: userId,
      is_admin: true,
    });

    await this.adminEntity.save(user);

    return user;
  }

  async createAdmin(payload: CreateAdminRequestDto): Promise<Admin> {
    const userId = GetDatabaseDefaultID("AD");

    const user = this.adminEntity.create({
      ...payload,
      id: userId,
    });

    // save user
    await this.adminEntity.save(user);

    return user;
  }

  async findAdmins(
    params: SearchAdminsRequestDto,
  ): Promise<{ data: Admin[]; pagination: PaginationResponseDto }> {
    const { data, pagination } = await getEntitesAndPagination(
      this.adminEntity,
      params,
      (query, originalNameEntity) => {
        // filter with email or id
        if (params.search) {
          query.where(`${originalNameEntity}.email LIKE :email`, {
            email: `%${params.search}%`,
          });

          query.orWhere(`${originalNameEntity}.id LIKE :id`, {
            id: `%${params.search}%`,
          });
        }

        // filter with status
        if (params.status) {
          query.andWhere(`${originalNameEntity}.is_active = :status`, {
            status: params.status === ENUM_ADMIN_STATUS.ACTIVE ? true : false,
          });
        }
      },
    );

    return { data, pagination };
  }

  async findByEmail(email: string): Promise<Admin> {
    return await this.adminEntity.findOneBy({
      email,
    });
  }

  async findByUserId(id: string): Promise<Admin> {
    return await this.adminEntity.findOneBy({
      id,
    });
  }

  async updateAdmin(id: string, payload: UpdateAdminRequestDto): Promise<void> {
    await this.adminEntity.update({ id }, payload);
  }

  async changePassword(id: string, password: string): Promise<void> {
    await this.adminEntity.update({ id }, { password });
  }

  async enableAdmin(id: string): Promise<void> {
    await this.adminEntity.update({ id }, { is_active: true });
  }

  async disableAdmin(id: string): Promise<void> {
    await this.adminEntity.update({ id }, { is_active: false });
  }

  async deleteAdmin(id: string): Promise<void> {
    await this.adminEntity.delete(id);
  }
}
