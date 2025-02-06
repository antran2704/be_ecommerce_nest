import { PaginationRequestDto } from "~/common/pagination/dtos";
import { IEntitesAndPaginationReponse } from "~/common/pagination/interfaces/pagination.interface";
import {
  AdminCreateVariantTypeRequestDto,
  AdminGetVariantTypeResponseDto,
  AdminUpdateVariantTypeRequestDto,
} from "../dtos/services";

export interface IAdminVariantTypeService {
  getVariantTypes(
    payload: PaginationRequestDto,
  ): Promise<IEntitesAndPaginationReponse<AdminGetVariantTypeResponseDto>>;
  getVariantTypeById(id: string): Promise<AdminGetVariantTypeResponseDto>;
  createVariantType(payload: AdminCreateVariantTypeRequestDto): Promise<void>;
  updateVariantType(
    id: string,
    payload: AdminUpdateVariantTypeRequestDto,
  ): Promise<void>;
  deleteVariantType(id: string): Promise<void>;
}
