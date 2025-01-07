import { PaginationSearchRequestDto } from "src/common/pagination/dtos";
import { CreateAdminDto } from "../dtos/create_admin.dto";
import PaginationResponseDto from "src/common/pagination/dtos/pagination_response.dto";
import { Admin } from "../entities/admin.entity";

export interface IAdminRepository {
  createAdmin(payload: CreateAdminDto): Promise<string>;
  createSuperUser(payload: CreateAdminDto): Promise<string>;

  findByEmail(email: string): Promise<Admin>;
  findAdmins(
    params: PaginationSearchRequestDto,
  ): Promise<{ data: Admin[]; pagination: PaginationResponseDto }>;
}