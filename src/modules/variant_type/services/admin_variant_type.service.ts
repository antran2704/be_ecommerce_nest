import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";

import { GetDatabaseDefaultID } from "~/helpers/database";
import { ENUM_PREFIX_DATABASE } from "~/common/database/enums/perfix.enum";

import { IEntitesAndPaginationReponse } from "~/common/pagination/interfaces/pagination.interface";
import { BadRequestException } from "@nestjs/common";
import { VARIANT_TYPE_ERROR_MESSAGES } from "../messages/variant_type.error";
import { IAdminVariantTypeService } from "../interfaces/admin_variant_type_service.interface";
import { AdminVariantTypeRepository } from "../repositories/admin_variant_type.repository";
import { PaginationRequestDto } from "~/common/pagination/dtos";
import {
  AdminCreateVariantTypeRequestDto,
  AdminGetVariantTypeResponseDto,
  AdminUpdateVariantTypeRequestDto,
} from "../dtos/services";
import { VariantTypeEntity } from "../entities/variant_type.entity";
import {
  CreateVariantTypeDto,
  UpdateVariantTypeDto,
} from "../dtos/repositories";

export class AdminVariantTypeService implements IAdminVariantTypeService {
  constructor(
    private readonly variantTypeRepository: AdminVariantTypeRepository,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async getVariantTypes(
    payload: PaginationRequestDto,
  ): Promise<IEntitesAndPaginationReponse<AdminGetVariantTypeResponseDto>> {
    const { data, pagination } =
      await this.variantTypeRepository.findVariantTypes(payload);
    const formatData = this.mapper.mapArray(
      data,
      VariantTypeEntity,
      AdminGetVariantTypeResponseDto,
    );

    return { data: formatData, pagination };
  }

  async getVariantTypeById(
    id: string,
  ): Promise<AdminGetVariantTypeResponseDto> {
    const data = await this.variantTypeRepository.findVariantTypeById(id);

    if (!data) {
      throw new BadRequestException(
        VARIANT_TYPE_ERROR_MESSAGES.VARIANT_TYPE_NOT_FOUND,
      );
    }

    const formatData = this.mapper.map(
      data,
      VariantTypeEntity,
      AdminGetVariantTypeResponseDto,
    );
    return formatData;
  }

  async createVariantType(
    payload: AdminCreateVariantTypeRequestDto,
  ): Promise<void> {
    const exitRecord = await this.variantTypeRepository.findVariantTypeByName(
      payload.variantTypeName,
    );

    if (exitRecord)
      throw new BadRequestException(
        VARIANT_TYPE_ERROR_MESSAGES.VARIANT_TYPE_NAME_EXISTED,
      );

    const newId = GetDatabaseDefaultID(ENUM_PREFIX_DATABASE.VT);

    const formatData: CreateVariantTypeDto = {
      id: newId,
      name: payload.variantTypeName,
    };

    await this.variantTypeRepository.create(formatData);
  }

  async updateVariantType(
    id: string,
    payload: AdminUpdateVariantTypeRequestDto,
  ) {
    const variantType =
      await this.variantTypeRepository.findVariantTypeById(id);

    if (!variantType) {
      throw new BadRequestException(
        VARIANT_TYPE_ERROR_MESSAGES.VARIANT_TYPE_NOT_FOUND,
      );
    }

    const variantTypeName =
      await this.variantTypeRepository.findVariantTypeByName(
        payload.variantTypeName,
      );

    if (variantTypeName && variantTypeName.id !== id)
      throw new BadRequestException(
        VARIANT_TYPE_ERROR_MESSAGES.VARIANT_TYPE_NAME_EXISTED,
      );

    const formatData: UpdateVariantTypeDto = {
      name: payload.variantTypeName,
    };

    await this.variantTypeRepository.update(id, formatData);
  }

  async deleteVariantType(id: string): Promise<void> {
    const variantType =
      await this.variantTypeRepository.findVariantTypeById(id);

    if (!variantType)
      throw new BadRequestException(
        VARIANT_TYPE_ERROR_MESSAGES.VARIANT_TYPE_NOT_FOUND,
      );

    await this.variantTypeRepository.delete(id);
  }
}
