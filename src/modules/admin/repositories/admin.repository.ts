import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { IAdminRepository } from "../interfaces/admin_repository.interface";
import { getEntitesAndPagination } from "~/common/pagination/helpers/pagination";
import { AdminEntity } from "../entities/admin.entity";
import { GetDatabaseDefaultID } from "~/helpers/database";
import {
  CreateAdminDto,
  SearchAdminsRequestDto,
  UpdateAdminDto,
  UpdateAdminMeDto,
} from "../dtos";
import { ENUM_ADMIN_STATUS } from "../enums/admin.enum";
import { IEntitesAndPaginationReponse } from "~/common/pagination/interfaces/pagination.interface";
import { ENUM_PREFIX_DATABASE } from "~/common/database/enums/perfix.enum";

@Injectable()
export class AdminRepository implements IAdminRepository {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminEntity: Repository<AdminEntity>,
  ) {}

  async createSuperUser(payload: CreateAdminDto): Promise<AdminEntity> {
    const userId = GetDatabaseDefaultID(ENUM_PREFIX_DATABASE.AD);

    const user = this.adminEntity.create({
      ...payload,
      id: userId,
      is_admin: true,
    });

    await this.adminEntity.save(user);

    return user;
  }

  async createAdmin(payload: CreateAdminDto): Promise<AdminEntity> {
    const userId = GetDatabaseDefaultID(ENUM_PREFIX_DATABASE.AD);

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
  ): Promise<IEntitesAndPaginationReponse<AdminEntity>> {
    const { data, pagination } = await getEntitesAndPagination(
      this.adminEntity,
      params,
      (query, originalNameEntity) => {
        // filter with email or id
        if (params.search) {
          query.where(`${originalNameEntity}.id LIKE :id`, {
            id: `${params.search}%`,
          });

          query.orWhere(`${originalNameEntity}.email LIKE :email`, {
            email: `${params.search}%`,
          });
        }

        // filter with status
        if (params.status) {
          query.andWhere(`${originalNameEntity}.is_active = :status`, {
            status: params.status === ENUM_ADMIN_STATUS.ACTIVE ? true : false,
          });
        }

        // left join Role table
        query.leftJoinAndSelect(`${originalNameEntity}.role`, "role");

        // left join GroupRole table
        query.leftJoinAndSelect("role.groupRole", "groupRole");
      },
    );

    return { data, pagination };
  }

  async findByEmail(email: string): Promise<AdminEntity> {
    return await this.adminEntity.findOne({
      where: { email },
      relations: ["role.groupRole"],
    });
  }

  async findByUserId(id: string): Promise<AdminEntity> {
    return await this.adminEntity.findOne({
      where: { id },
      relations: ["role.groupRole"],
    });
  }

  async findPermissions(id: string): Promise<AdminEntity> {
    return await this.adminEntity.findOne({
      where: { id },
      relations: ["role"],
    });
  }

  async updateAdmin(
    id: string,
    payload: UpdateAdminDto | UpdateAdminMeDto,
  ): Promise<void> {
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
