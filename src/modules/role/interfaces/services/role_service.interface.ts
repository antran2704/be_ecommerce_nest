import { IEntitesAndPaginationReponse } from "src/common/pagination/interfaces/pagination.interface";
import {
  CreateRoleRequestDto,
  GetRoleResponeDto,
  SearchRolesRequestDto,
  UpdateRoleRequestDto,
} from "../../dtos";
import { RoleEntity } from "../../entities/role.entity";

export default interface IRoleService {
  getRoles(
    params: SearchRolesRequestDto,
  ): Promise<IEntitesAndPaginationReponse<GetRoleResponeDto>>;
  getRole(id: string): Promise<GetRoleResponeDto>;
  getRoleEntity(id: string): Promise<RoleEntity>;

  createRole(payload: CreateRoleRequestDto): Promise<void>;
  updateRole(id: string, payload: UpdateRoleRequestDto): Promise<void>;
  deleteRole(id: string): Promise<void>;
}
