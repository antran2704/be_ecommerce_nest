import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";

import { GetDatabaseDefaultID } from "~/helpers/database";
import { ENUM_PREFIX_DATABASE } from "~/common/database/enums/perfix.enum";

import { IEntitesAndPaginationReponse } from "~/common/pagination/interfaces/pagination.interface";
import { BadRequestException } from "@nestjs/common";
import { VARIANT_TYPE__VALUE_ERROR_MESSAGES } from "../messages/variant_type_value.error";
import { AdminVariantTypeValueRepository } from "../repositories/admin_variant_type.repository";
import { IAdminVariantTypeValueService } from "../interfaces/admin_variant_type_value_service.interface";
import {
  AdminCreateVariantTypeValueRequestDto,
  AdminGetVariantTypeValueResponseDto,
  AdminGetVariantTypeValuesRequestDto,
  AdminUpdateVariantTypeValueRequestDto,
} from "../dtos/services";
import { VariantTypeValueEntity } from "../entities/variant_type.entity";
import {
  CreateVariantTypeValueDto,
  UpdateVariantTypeValueDto,
} from "../dtos/repositories";

export class AdminVariantTypeValueService
  implements IAdminVariantTypeValueService
{
  constructor(
    private readonly variantValueRepository: AdminVariantTypeValueRepository,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async getVariantValues(
    payload: AdminGetVariantTypeValuesRequestDto,
  ): Promise<
    IEntitesAndPaginationReponse<AdminGetVariantTypeValueResponseDto>
  > {
    const { data, pagination } =
      await this.variantValueRepository.findValues(payload);
    const formatData = this.mapper.mapArray(
      data,
      VariantTypeValueEntity,
      AdminGetVariantTypeValueResponseDto,
    );

    return { data: formatData, pagination };
  }

  async getVariantValueById(
    id: string,
  ): Promise<AdminGetVariantTypeValueResponseDto> {
    const data = await this.variantValueRepository.findById(id);

    if (!data) {
      throw new BadRequestException(
        VARIANT_TYPE__VALUE_ERROR_MESSAGES.VARIANT_VALUE_NOT_FOUND,
      );
    }

    const formatData = this.mapper.map(
      data,
      VariantTypeValueEntity,
      AdminGetVariantTypeValueResponseDto,
    );

    return formatData;
  }

  async createVariantValue(
    payload: AdminCreateVariantTypeValueRequestDto,
  ): Promise<void> {
    const exitRecord = await this.variantValueRepository.findByName(
      payload.variantValueName,
      payload.variantTypeId,
    );

    if (exitRecord)
      throw new BadRequestException(
        VARIANT_TYPE__VALUE_ERROR_MESSAGES.VARIANT_VALUE_NAME_EXISTED,
      );

    const newId = GetDatabaseDefaultID(ENUM_PREFIX_DATABASE.VTE);

    const formatData: CreateVariantTypeValueDto = {
      id: newId,
      name: payload.variantValueName,
      variant_type_id: payload.variantTypeId,
    };

    await this.variantValueRepository.create(formatData);
  }

  async updateVariantValue(
    id: string,
    payload: AdminUpdateVariantTypeValueRequestDto,
  ) {
    const variantValue = await this.variantValueRepository.findById(id);

    if (!variantValue) {
      throw new BadRequestException(
        VARIANT_TYPE__VALUE_ERROR_MESSAGES.VARIANT_VALUE_NOT_FOUND,
      );
    }

    const variantTypeName = await this.variantValueRepository.findByName(
      payload.variantTypeValueName,
      variantValue.variant_type_id,
    );

    if (variantTypeName && variantTypeName.id !== id)
      throw new BadRequestException(
        VARIANT_TYPE__VALUE_ERROR_MESSAGES.VARIANT_VALUE_NAME_EXISTED,
      );

    const formatData: UpdateVariantTypeValueDto = {
      name: payload.variantTypeValueName,
    };

    await this.variantValueRepository.update(id, formatData);
  }

  async deleteVariantValue(id: string): Promise<void> {
    const variantValue = await this.variantValueRepository.findById(id);

    if (!variantValue)
      throw new BadRequestException(
        VARIANT_TYPE__VALUE_ERROR_MESSAGES.VARIANT_VALUE_NOT_FOUND,
      );

    await this.variantValueRepository.delete(id);
  }
}
