import { PaginationSearchRequestDto } from "src/common/pagination/dtos";
import { GroupRole } from "../entities/group_role.entity";
import { IEntitesAndPaginationReponse } from "src/common/pagination/interfaces/pagination.interface";
import { CreateGroupRoleRequestDto, UpdateGroupRoleRequestDto } from "../dtos";

export default interface IGroupRoleRepository {
  getGroupRoles(
    params: PaginationSearchRequestDto,
  ): Promise<IEntitesAndPaginationReponse<GroupRole>>;
  getGroupRole(id: string): Promise<GroupRole>;
  getGroupRoleByName(value: string): Promise<GroupRole>;

  createGroupRole(payload: CreateGroupRoleRequestDto): Promise<void>;
  updateGroupRole(
    id: string,
    payload: UpdateGroupRoleRequestDto,
  ): Promise<void>;
  deleteGroupRole(id: string): Promise<void>;
}
