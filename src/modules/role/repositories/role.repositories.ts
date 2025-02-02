import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { IRoleRepository } from "../interfaces/repositories";
import { RoleEntity } from "../entities/role.entity";
import { getEntitesAndPagination } from "~/common/pagination/helpers/pagination";
import {
  CreateRoleRequestDto,
  SearchRolesRequestDto,
  UpdateRoleRequestDto,
} from "../dtos";
import { GetDatabaseDefaultID } from "~/helpers/database";
import { ENUM_PREFIX_DATABASE } from "~/common/database/enums/perfix.enum";
import { GroupRoleEntity } from "~/modules/group_role/entities/group_role.entity";

@Injectable()
export default class RoleRepository implements IRoleRepository {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleEntity: Repository<RoleEntity>,
  ) {}

  async getRoles(params: SearchRolesRequestDto): Promise<any> {
    return getEntitesAndPagination(this.roleEntity, params, (query, entity) => {
      if (params.groupRoleId) {
        query.where(`${entity}.group_role_id = :groupRoleId`, {
          groupRoleId: params.groupRoleId,
        });
      }
    });
  }

  async getRoleById(id: string): Promise<RoleEntity> {
    return this.roleEntity.findOne({ where: { id } });
  }

  async getRoleByName(value: string): Promise<RoleEntity> {
    return this.roleEntity.findOne({ where: { name: value } });
  }

  async createRole(
    groupRole: GroupRoleEntity,
    payload: CreateRoleRequestDto,
  ): Promise<void> {
    const id = GetDatabaseDefaultID(ENUM_PREFIX_DATABASE.RO);
    const role = this.roleEntity.create({ ...payload, id, groupRole });

    await this.roleEntity.save(role);
  }

  async updateRole(id: string, payload: UpdateRoleRequestDto): Promise<void> {
    await this.roleEntity.update(id, payload);
  }

  async deleteRole(id: string): Promise<void> {
    await this.roleEntity.delete(id);
  }
}
