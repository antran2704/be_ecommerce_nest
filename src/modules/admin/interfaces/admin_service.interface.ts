import {
  ChangePasswordAdminRequestDto,
  CreateAdminRequestDto,
  CreateSuperAdminRequestDto,
  GetAdminResponseDto,
  SearchAdminsRequestDto,
} from "../dtos";
import { IEntitesAndPaginationReponse } from "src/common/pagination/interfaces/pagination.interface";

export interface IAdminService {
  createUser(payload: CreateAdminRequestDto): Promise<void>;
  createSuperUser(payload: CreateSuperAdminRequestDto): Promise<void>;
  getAdmins(
    params: SearchAdminsRequestDto,
  ): Promise<IEntitesAndPaginationReponse<GetAdminResponseDto>>;

  getAdmin(id: string): Promise<GetAdminResponseDto>;

  updateAdmin(id: string, payload: CreateAdminRequestDto): Promise<void>;

  enableAdmin(id: string): Promise<void>;
  disableAdmin(id: string): Promise<void>;
  changePassword(
    id: string,
    data: ChangePasswordAdminRequestDto,
  ): Promise<void>;

  deleteAdmin(id: string): Promise<void>;
}
