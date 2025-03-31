import {
  ChangePasswordAdminRequestDto,
  CreateAdminRequestDto,
  CreateSuperAdminRequestDto,
  GetAdminListResponseDto,
  GetAdminPermissionResponseDto,
  GetAdminResponseDto,
  IsExitAdminRequestDto,
  ResetPasswordRequestDto,
  SearchAdminsRequestDto,
  UpdateAdminMeRequestDto,
  UpdateAdminRequestDto,
} from "../dtos";
import { IEntitesAndPaginationReponse } from "~/common/pagination/interfaces/pagination.interface";
import { AdminEntity } from "../entities/admin.entity";

export interface IAdminService {
  createUser(payload: CreateAdminRequestDto): Promise<void>;
  createSuperUser(payload: CreateSuperAdminRequestDto): Promise<void>;
  getAdmins(
    params: SearchAdminsRequestDto,
  ): Promise<IEntitesAndPaginationReponse<GetAdminListResponseDto>>;

  getAdminById(id: string): Promise<GetAdminResponseDto>;

  getAdminEntityById(id: string): Promise<AdminEntity>;
  getAdminEntityByEmail(id: string): Promise<AdminEntity>;

  getAdminPermissions(id: string): Promise<GetAdminPermissionResponseDto>;

  updateAdmin(id: string, payload: UpdateAdminRequestDto): Promise<void>;
  updateAdminMe(id: string, payload: UpdateAdminMeRequestDto): Promise<void>;

  isAdminExitByEmail(data: IsExitAdminRequestDto): Promise<boolean>;

  enableAdmin(id: string): Promise<void>;
  disableAdmin(id: string): Promise<void>;
  changePassword(
    id: string,
    data: ChangePasswordAdminRequestDto,
  ): Promise<void>;

  resetPassword(id: string, data: ResetPasswordRequestDto): Promise<void>;

  deleteAdmin(id: string): Promise<void>;
}
