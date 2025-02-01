import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";

import { RoleRepository } from "../repositories";
import { IRoleService } from "../interfaces/services";
import { IEntitesAndPaginationReponse } from "~/common/pagination/interfaces/pagination.interface";
import {
  SearchRolesRequestDto,
  CreateRoleRequestDto,
  UpdateRoleRequestDto,
  GetRoleResponeDto,
} from "../dtos";
import { RoleEntity } from "../entities/role.entity";
import { ROLE_MESSAGES } from "../messages/role.error";
import { GroupRoleService } from "~/modules/group_role/services/group_role.service";

@Injectable()
export class RoleService implements IRoleService {
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly groupRoleService: GroupRoleService,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async getRoles(
    params: SearchRolesRequestDto,
  ): Promise<IEntitesAndPaginationReponse<GetRoleResponeDto>> {
    const { data, pagination } = await this.roleRepository.getRoles(params);

    const result: GetRoleResponeDto[] = this.mapper.mapArray(
      data,
      RoleEntity,
      GetRoleResponeDto,
    );

    return { data: result, pagination };
  }
  async getRole(id: string): Promise<GetRoleResponeDto> {
    const data = await this.roleRepository.getRoleById(id);

    if (!data) throw new NotFoundException(ROLE_MESSAGES.ROLE_NOT_FOUND);

    const result: GetRoleResponeDto = this.mapper.map(
      data,
      RoleEntity,
      GetRoleResponeDto,
    );

    return result;
  }

  async getRoleEntity(id: string): Promise<RoleEntity> {
    const data = await this.roleRepository.getRoleById(id);
    if (!data) throw new NotFoundException(ROLE_MESSAGES.ROLE_NOT_FOUND);
    return data;
  }

  async createRole(payload: CreateRoleRequestDto): Promise<void> {
    // check group role is existed
    const groupRole = await this.groupRoleService.getGroupRoleEntity(
      payload.groupRoleId,
    );

    // check role name is existed
    const role = await this.roleRepository.getRoleByName(payload.name);

    if (role) throw new BadRequestException(ROLE_MESSAGES.ROLE_NAME_IS_EXISTED);

    await this.roleRepository.createRole(groupRole, payload);
  }
  async updateRole(id: string, payload: UpdateRoleRequestDto): Promise<void> {
    // check role is existed
    const isExitRole = await this.roleRepository.getRoleById(id);

    if (!isExitRole) throw new NotFoundException(ROLE_MESSAGES.ROLE_NOT_FOUND);

    // check role name is existed
    const role = await this.roleRepository.getRoleByName(payload.name);

    if (role && role.id !== id)
      throw new BadRequestException(ROLE_MESSAGES.ROLE_NAME_IS_EXISTED);

    await this.roleRepository.updateRole(id, payload);
  }

  async deleteRole(id: string): Promise<void> {
    const role = await this.roleRepository.getRoleById(id);

    if (!role) throw new NotFoundException(ROLE_MESSAGES.ROLE_NOT_FOUND);

    await this.roleRepository.deleteRole(id);
  }
}
