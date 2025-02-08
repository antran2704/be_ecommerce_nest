import { IEntitesAndPaginationReponse } from "~/common/pagination/interfaces/pagination.interface";
import {
  AdminCreateVariantTypeValueRequestDto,
  AdminGetVariantTypeValueResponseDto,
  AdminGetVariantTypeValuesRequestDto,
  AdminUpdateVariantTypeValueRequestDto,
} from "../dtos/services";

export interface IAdminVariantTypeValueService {
  getVariantValues(
    payload: AdminGetVariantTypeValuesRequestDto,
  ): Promise<IEntitesAndPaginationReponse<AdminGetVariantTypeValueResponseDto>>;
  getVariantValueById(id: string): Promise<AdminGetVariantTypeValueResponseDto>;
  createVariantValue(
    payload: AdminCreateVariantTypeValueRequestDto,
  ): Promise<void>;
  updateVariantValue(
    id: string,
    payload: AdminUpdateVariantTypeValueRequestDto,
  ): Promise<void>;
  deleteVariantValue(id: string): Promise<void>;
}
