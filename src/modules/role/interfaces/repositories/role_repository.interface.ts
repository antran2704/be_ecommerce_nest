import { PaginationSearchRequestDto } from "src/common/pagination/dtos";
import { IEntitesAndPaginationReponse } from "src/common/pagination/interfaces/pagination.interface";
import { Role } from "../../entities/role.entity";
import { CreateRoleRequestDto, UpdateRoleRequestDto } from "../../dtos";

export default interface IRoleRepository {
  getGroupRoles(
    params: PaginationSearchRequestDto,
  ): Promise<IEntitesAndPaginationReponse<Role>>;
  getGroupRole(id: string): Promise<Role>;
  getGroupRoleByName(value: string): Promise<Role>;

  createGroupRole(payload: CreateRoleRequestDto): Promise<void>;
  updateGroupRole(id: string, payload: UpdateRoleRequestDto): Promise<void>;
  deleteGroupRole(id: string): Promise<void>;
}
