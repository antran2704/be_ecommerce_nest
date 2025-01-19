import { PaginationSearchRequestDto } from "src/common/pagination/dtos";
import { GroupRoleEntity } from "../entities/group_role.entity";
import { IEntitesAndPaginationReponse } from "src/common/pagination/interfaces/pagination.interface";
import { CreateGroupRoleRequestDto, UpdateGroupRoleRequestDto } from "../dtos";

export default interface IGroupRoleRepository {
  getGroupRoles(
    params: PaginationSearchRequestDto,
  ): Promise<IEntitesAndPaginationReponse<GroupRoleEntity>>;
  getGroupRole(id: string): Promise<GroupRoleEntity>;
  getGroupRoleByName(value: string): Promise<GroupRoleEntity>;

  createGroupRole(payload: CreateGroupRoleRequestDto): Promise<void>;
  updateGroupRole(
    id: string,
    payload: UpdateGroupRoleRequestDto,
  ): Promise<void>;
  deleteGroupRole(id: string): Promise<void>;
}
