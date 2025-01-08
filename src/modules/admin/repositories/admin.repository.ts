import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { IAdminRepository } from "../interfaces/admin_repository.interface";
import { PaginationSearchRequestDto } from "src/common/pagination/dtos";
import { getEntitesAndPagination } from "src/common/pagination/helpers/pagination";
import PaginationResponseDto from "src/common/pagination/dtos/pagination_response.dto";
import { Admin } from "../entities/admin.entity";
import { CreateAdminDto } from "../dtos/create_admin.dto";
import { GetDatabaseDefaultID } from "src/helpers/database";
import { UpdateAdminRequestDto } from "../dtos/update_admin_request.dto";

@Injectable()
export class AdminRepository implements IAdminRepository {
  constructor(
    @InjectRepository(Admin)
    private readonly adminEntity: Repository<Admin>,
  ) {}

  async createSuperUser(payload: CreateAdminDto): Promise<Admin> {
    const userId = GetDatabaseDefaultID("AD");

    const user = this.adminEntity.create({
      ...payload,
      id: userId,
      is_admin: true,
    });

    await this.adminEntity.save(user);

    return user;
  }

  async createAdmin(payload: CreateAdminDto): Promise<Admin> {
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
    params: PaginationSearchRequestDto,
  ): Promise<{ data: Admin[]; pagination: PaginationResponseDto }> {
    const { data, pagination } = await getEntitesAndPagination(
      this.adminEntity,
      params,
      (query, originalNameEntity) => {
        if (params.search) {
          query.where(`${originalNameEntity}.email LIKE :email`, {
            email: `%${params.search}%`,
          });

          query.orWhere(`${originalNameEntity}.id LIKE :id`, {
            id: `%${params.search}%`,
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

  async deleteAdmin(id: string): Promise<void> {
    await this.adminEntity.delete(id);
  }
}
