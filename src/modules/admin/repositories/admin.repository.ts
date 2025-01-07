import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";

import { IAdminRepository } from "../interfaces/admin_repository.interface";
import { PaginationSearchRequestDto } from "src/common/pagination/dtos";
import { getEntitesAndPagination } from "src/common/pagination/helpers/pagination";
import { InjectRepository } from "@nestjs/typeorm";
import PaginationResponseDto from "src/common/pagination/dtos/pagination_response.dto";
import { Admin } from "../entities/admin.entity";
import { CreateAdminDto } from "../dtos/create_admin.dto";
import { GetDatabaseDefaultID } from "src/helpers/database";

@Injectable()
export class AdminRepository implements IAdminRepository {
  constructor(
    @InjectRepository(Admin)
    private readonly adminEntity: Repository<Admin>,
  ) {}

  async createSuperUser(payload: CreateAdminDto): Promise<string> {
    const userId = GetDatabaseDefaultID("AD");

    const user = this.adminEntity.create({
      ...payload,
      id: userId,
      is_admin: true,
    });

    await this.adminEntity.save(user);

    return userId;
  }

  async createAdmin(payload: CreateAdminDto): Promise<string> {
    const userId = GetDatabaseDefaultID("AD");

    const user = this.adminEntity.create({
      ...payload,
      id: userId,
    });

    // save user
    await this.adminEntity.save(user);

    return userId;
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
        }

        query.leftJoinAndSelect(`${originalNameEntity}.authAdminToken`, "authAdminToken");
      },
    );

    return { data, pagination };
  }

  async findByEmail(email: string): Promise<Admin> {
    return await this.adminEntity.findOneBy({
      email,
    });
  }
}
