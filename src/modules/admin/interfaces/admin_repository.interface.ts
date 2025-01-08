import PaginationResponseDto from "src/common/pagination/dtos/pagination_response.dto";
import { Admin } from "../entities/admin.entity";
import { CreateAdminRequestDto, SearchAdminsRequestDto } from "../dtos";

export interface IAdminRepository {
  createAdmin(payload: CreateAdminRequestDto): Promise<Admin>;
  createSuperUser(payload: CreateAdminRequestDto): Promise<Admin>;

  findByUserId(id: string): Promise<Admin>;
  findByEmail(email: string): Promise<Admin>;
  findAdmins(
    params: SearchAdminsRequestDto,
  ): Promise<{ data: Admin[]; pagination: PaginationResponseDto }>;

  updateAdmin(id: string, payload: CreateAdminRequestDto): Promise<void>;
  enableAdmin(id: string): Promise<void>;
  disableAdmin(id: string): Promise<void>;
  changePassword(id: string, password: string): Promise<void>;

  deleteAdmin(id: string): Promise<void>;
}
