import { PaginationSearchRequestDto } from "src/common/pagination/dtos";

import {
  CreateGroupRoleRequestDto,
  GetGroupRoleResponeDto,
  UpdateGroupRoleRequestDto,
} from "../dtos";
import { IEntitesAndPaginationReponse } from "src/common/pagination/interfaces/pagination.interface";

export default interface IGroupRoleService {
  getGroupRoles(
    params: PaginationSearchRequestDto,
  ): Promise<IEntitesAndPaginationReponse<GetGroupRoleResponeDto>>;
  getGroupRole(id: string): Promise<GetGroupRoleResponeDto>;

  createGroupRole(payload: CreateGroupRoleRequestDto): Promise<void>;
  updateGroupRole(
    id: string,
    payload: UpdateGroupRoleRequestDto,
  ): Promise<void>;
  deleteGroupRole(id: string): Promise<void>;
}
