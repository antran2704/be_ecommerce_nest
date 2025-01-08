import {
  CreateSuccessResponse,
  DeletedSuccessResponse,
  GetSuccessWithPaginationResponse,
  UpdatedSuccessResponse,
} from "src/common/response/success.response";

import {
  ChangePasswordAdminRequestDto,
  CreateAdminRequestDto,
  CreateSuperAdminRequestDto,
  GetAdminResponseDto,
  SearchAdminsRequestDto,
} from "../dtos";

export interface IAdminService {
  createUser(payload: CreateAdminRequestDto): Promise<CreateSuccessResponse>;
  createSuperUser(
    payload: CreateSuperAdminRequestDto,
  ): Promise<CreateSuccessResponse>;
  getAdmins(
    params: SearchAdminsRequestDto,
  ): Promise<GetSuccessWithPaginationResponse<GetAdminResponseDto[]>>;

  updateAdmin(
    id: string,
    payload: CreateAdminRequestDto,
  ): Promise<UpdatedSuccessResponse>;

  enableAdmin(id: string): Promise<UpdatedSuccessResponse>;
  disableAdmin(id: string): Promise<UpdatedSuccessResponse>;
  changePassword(
    id: string,
    data: ChangePasswordAdminRequestDto,
  ): Promise<UpdatedSuccessResponse>;

  deleteAdmin(id: string): Promise<DeletedSuccessResponse>;
}
