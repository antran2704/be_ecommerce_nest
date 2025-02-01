import { PaginationSearchRequestDto } from "~/common/pagination/dtos";

import {
  CreateGroupRoleRequestDto,
  GetGroupRoleResponeDto,
  UpdateGroupRoleRequestDto,
} from "../dtos";
import { IEntitesAndPaginationReponse } from "~/common/pagination/interfaces/pagination.interface";
import { GroupRoleEntity } from "../entities/group_role.entity";

export default interface IGroupRoleService {
  getGroupRoles(
    params: PaginationSearchRequestDto,
  ): Promise<IEntitesAndPaginationReponse<GetGroupRoleResponeDto>>;
  getGroupRole(id: string): Promise<GetGroupRoleResponeDto>;
  getGroupRoleEntity(id: string): Promise<GroupRoleEntity>;

  createGroupRole(payload: CreateGroupRoleRequestDto): Promise<void>;
  updateGroupRole(
    id: string,
    payload: UpdateGroupRoleRequestDto,
  ): Promise<void>;
  deleteGroupRole(id: string): Promise<void>;
}
