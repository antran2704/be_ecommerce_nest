import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";

import { IGroupRoleService } from "../interfaces";
import { GroupRole } from "../entities/group_role.entity";
import { PaginationSearchRequestDto } from "src/common/pagination/dtos";
import { GROUP_ROLE_MESSAGES } from "../messages/group_role.error";
import {
  CreateGroupRoleRequestDto,
  GetGroupRoleResponeDto,
  UpdateGroupRoleRequestDto,
} from "../dtos";
import GroupRoleRepository from "../repositories/group_role.repository";
import { IEntitesAndPaginationReponse } from "src/common/pagination/interfaces/pagination.interface";

@Injectable()
export class GroupRoleService implements IGroupRoleService {
  constructor(
    @InjectMapper() private readonly mapper: Mapper,
    private readonly groupRoleRepository: GroupRoleRepository,
  ) {}

  async getGroupRoles(
    params: PaginationSearchRequestDto,
  ): Promise<IEntitesAndPaginationReponse<GetGroupRoleResponeDto>> {
    const { data, pagination } =
      await this.groupRoleRepository.getGroupRoles(params);

    const result: GetGroupRoleResponeDto[] = this.mapper.mapArray(
      data,
      GroupRole,
      GetGroupRoleResponeDto,
    );

    return { data: result, pagination };
  }

  async getGroupRole(id: string): Promise<GetGroupRoleResponeDto> {
    const groupRole = await this.groupRoleRepository.getGroupRole(id);

    if (!groupRole) {
      throw new NotFoundException(GROUP_ROLE_MESSAGES.GROUP_ROLE_NOT_FOUND);
    }

    const result = this.mapper.map(
      groupRole,
      GroupRole,
      GetGroupRoleResponeDto,
    );

    return result;
  }

  async createGroupRole(payload: CreateGroupRoleRequestDto): Promise<void> {
    const groupRole = await this.groupRoleRepository.getGroupRoleByName(
      payload.name,
    );

    if (groupRole) {
      throw new BadRequestException(GROUP_ROLE_MESSAGES.GROUP_ROLE_IS_EXISTED);
    }

    await this.groupRoleRepository.createGroupRole(payload);
  }

  async updateGroupRole(
    id: string,
    payload: UpdateGroupRoleRequestDto,
  ): Promise<void> {
    const groupRole = await this.groupRoleRepository.getGroupRole(id);

    if (!groupRole) {
      throw new NotFoundException(GROUP_ROLE_MESSAGES.GROUP_ROLE_NOT_FOUND);
    }

    await this.groupRoleRepository.updateGroupRole(id, payload);
  }

  async deleteGroupRole(id: string): Promise<void> {
    const groupRole = await this.groupRoleRepository.getGroupRole(id);

    if (!groupRole) {
      throw new NotFoundException(GROUP_ROLE_MESSAGES.GROUP_ROLE_NOT_FOUND);
    }

    await this.groupRoleRepository.deleteGroupRole(id);
  }
}
