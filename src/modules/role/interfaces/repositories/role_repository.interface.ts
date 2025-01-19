import { IEntitesAndPaginationReponse } from "src/common/pagination/interfaces/pagination.interface";
import { RoleEntity } from "../../entities/role.entity";
import {
  CreateRoleRequestDto,
  SearchRolesRequestDto,
  UpdateRoleRequestDto,
} from "../../dtos";
import { GroupRoleEntity } from "src/modules/group_role/entities/group_role.entity";

export default interface IRoleRepository {
  getRoles(
    params: SearchRolesRequestDto,
  ): Promise<IEntitesAndPaginationReponse<RoleEntity>>;
  getRoleById(id: string): Promise<RoleEntity>;
  getRoleByName(value: string): Promise<RoleEntity>;

  createRole(
    groupRole: GroupRoleEntity,
    payload: CreateRoleRequestDto,
  ): Promise<void>;
  updateRole(id: string, payload: UpdateRoleRequestDto): Promise<void>;
  deleteRole(id: string): Promise<void>;
}
