import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { IGroupRoleRepository } from "../interfaces";
import { GroupRoleEntity } from "../entities/group_role.entity";
import { IEntitesAndPaginationReponse } from "src/common/pagination/interfaces/pagination.interface";
import { PaginationSearchRequestDto } from "src/common/pagination/dtos";
import { getEntitesAndPagination } from "src/common/pagination/helpers/pagination";
import { CreateGroupRoleRequestDto, UpdateGroupRoleRequestDto } from "../dtos";
import { GetDatabaseDefaultID } from "src/helpers/database";
import { ENUM_PREFIX_DATABASE } from "src/common/database/enums/perfix.enum";

@Injectable()
export default class GroupRoleRepository implements IGroupRoleRepository {
  constructor(
    @InjectRepository(GroupRoleEntity)
    private readonly groupRoleEntity: Repository<GroupRoleEntity>,
  ) {}

  async getGroupRoles(
    params: PaginationSearchRequestDto,
  ): Promise<IEntitesAndPaginationReponse<GroupRoleEntity>> {
    const { data, pagination } = await getEntitesAndPagination(
      this.groupRoleEntity,
      params,
      (query, originalNameEntity) => {
        // filter with name or id
        if (params.search) {
          query.where(`${originalNameEntity}.id LIKE :id`, {
            id: `%${params.search}%`,
          });

          query.orWhere(`${originalNameEntity}.name LIKE :name`, {
            name: `%${params.search}%`,
          });
        }
      },
    );

    return { data, pagination };
  }

  async getGroupRole(id: string): Promise<GroupRoleEntity> {
    return this.groupRoleEntity.findOneBy({ id });
  }

  async getGroupRoleByName(value: string): Promise<GroupRoleEntity> {
    return this.groupRoleEntity.findOneBy({ name: value });
  }

  async createGroupRole(payload: CreateGroupRoleRequestDto): Promise<void> {
    const id = GetDatabaseDefaultID(ENUM_PREFIX_DATABASE.GR);

    const groupRole = this.groupRoleEntity.create({ ...payload, id });

    await this.groupRoleEntity.save(groupRole);
  }

  async updateGroupRole(
    id: string,
    payload: UpdateGroupRoleRequestDto,
  ): Promise<void> {
    await this.groupRoleEntity.update(id, payload);
  }

  async deleteGroupRole(id: string): Promise<void> {
    await this.groupRoleEntity.delete(id);
  }
}
