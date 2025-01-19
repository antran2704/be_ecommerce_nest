import { AdminEntity } from "../entities/admin.entity";
import {
  CreateAdminDto,
  SearchAdminsRequestDto,
  UpdateAdminDto,
} from "../dtos";
import { IEntitesAndPaginationReponse } from "src/common/pagination/interfaces/pagination.interface";

export interface IAdminRepository {
  createAdmin(payload: CreateAdminDto): Promise<AdminEntity>;
  createSuperUser(payload: CreateAdminDto): Promise<AdminEntity>;

  findByUserId(id: string): Promise<AdminEntity>;
  findByEmail(email: string): Promise<AdminEntity>;
  findAdmins(
    params: SearchAdminsRequestDto,
  ): Promise<IEntitesAndPaginationReponse<AdminEntity>>;

  findPermissions(id: string): Promise<AdminEntity>;

  updateAdmin(id: string, payload: UpdateAdminDto): Promise<void>;
  enableAdmin(id: string): Promise<void>;
  disableAdmin(id: string): Promise<void>;
  changePassword(id: string, password: string): Promise<void>;

  deleteAdmin(id: string): Promise<void>;
}
