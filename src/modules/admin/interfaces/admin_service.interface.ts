import {
  CreateSuccessResponse,
  DeletedSuccessResponse,
  GetSuccessWithPaginationResponse,
  UpdatedSuccessResponse,
} from "src/common/response/success.response";
import { CreateAdminDto } from "../dtos/create_admin.dto";
import { CreateSuperAdminDto } from "../dtos/create_super_admin.dto";
import { PaginationSearchRequestDto } from "src/common/pagination/dtos";
import { GetAdminReponseDto } from "../dtos/get_admin_response.dto";

export interface IAdminService {
  createUser(payload: CreateAdminDto): Promise<CreateSuccessResponse>;
  createSuperUser(payload: CreateSuperAdminDto): Promise<CreateSuccessResponse>;
  getAdmins(
    params: PaginationSearchRequestDto,
  ): Promise<GetSuccessWithPaginationResponse<GetAdminReponseDto[]>>;

  updateAdmin(id: string, payload: CreateAdminDto): Promise<UpdatedSuccessResponse>;

  deleteAdmin(id: string): Promise<DeletedSuccessResponse>;
}
