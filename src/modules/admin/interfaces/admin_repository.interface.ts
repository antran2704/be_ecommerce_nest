import { AdminEntity } from "../entities/admin.entity";
import { CreateAdminRequestDto, SearchAdminsRequestDto } from "../dtos";
import { IEntitesAndPaginationReponse } from "src/common/pagination/interfaces/pagination.interface";

export interface IAdminRepository {
  createAdmin(payload: CreateAdminRequestDto): Promise<AdminEntity>;
  createSuperUser(payload: CreateAdminRequestDto): Promise<AdminEntity>;

  findByUserId(id: string): Promise<AdminEntity>;
  findByEmail(email: string): Promise<AdminEntity>;
  findAdmins(
    params: SearchAdminsRequestDto,
  ): Promise<IEntitesAndPaginationReponse<AdminEntity>>;

  updateAdmin(id: string, payload: CreateAdminRequestDto): Promise<void>;
  enableAdmin(id: string): Promise<void>;
  disableAdmin(id: string): Promise<void>;
  changePassword(id: string, password: string): Promise<void>;

  deleteAdmin(id: string): Promise<void>;
}
