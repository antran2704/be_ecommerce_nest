import {
  ChangePasswordAdminRequestDto,
  CreateAdminRequestDto,
  CreateSuperAdminRequestDto,
  GetAdminPermissionResponseDto,
  GetAdminResponseDto,
  SearchAdminsRequestDto,
} from "../dtos";
import { IEntitesAndPaginationReponse } from "src/common/pagination/interfaces/pagination.interface";
import { AdminEntity } from "../entities/admin.entity";

export interface IAdminService {
  createUser(payload: CreateAdminRequestDto): Promise<void>;
  createSuperUser(payload: CreateSuperAdminRequestDto): Promise<void>;
  getAdmins(
    params: SearchAdminsRequestDto,
  ): Promise<IEntitesAndPaginationReponse<GetAdminResponseDto>>;

  getAdminById(id: string): Promise<GetAdminResponseDto>;

  getAdminEntityById(id: string): Promise<AdminEntity>;
  getAdminEntityByEmail(id: string): Promise<AdminEntity>;

  getAdminPermissions(id: string): Promise<GetAdminPermissionResponseDto>;

  updateAdmin(id: string, payload: CreateAdminRequestDto): Promise<void>;

  enableAdmin(id: string): Promise<void>;
  disableAdmin(id: string): Promise<void>;
  changePassword(
    id: string,
    data: ChangePasswordAdminRequestDto,
  ): Promise<void>;

  deleteAdmin(id: string): Promise<void>;
}
