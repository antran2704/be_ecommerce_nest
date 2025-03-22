import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { InventoryEntity } from "../entities/inventory.entity";
import { AdminGetVariantProductInventoryRequestDto } from "../dtos/services";
import { ENUM_PAGINATION_ORDER } from "~/common/pagination/enums/order.enum";
import {
  AdminCreateProductInventoryDto,
  AdminCreateVariantProductInventoryDto,
} from "../dtos/repositories";
import { IAdminVariantProductInventoryRepository } from "../interfaces";

export class AdminVariantProductInventoryRepository
  implements IAdminVariantProductInventoryRepository
{
  constructor(
    @InjectRepository(InventoryEntity)
    private readonly entity: Repository<InventoryEntity>,
  ) {}

  async findByVariantProductId(
    payload: AdminGetVariantProductInventoryRequestDto,
  ): Promise<InventoryEntity[]> {
    const data = await this.entity.find({
      where: { variant_product: { id: payload.variantProductId } },
      order: {
        updated_at:
          payload.order === ENUM_PAGINATION_ORDER.ASC
            ? ENUM_PAGINATION_ORDER.ASC
            : ENUM_PAGINATION_ORDER.DESC,
      },
    });

    return data;
  }

  async create(payload: AdminCreateVariantProductInventoryDto): Promise<void> {
    const newEntity = this.entity.create(payload);
    await this.entity.save(newEntity);
  }

  async save(payload: InventoryEntity): Promise<void> {
    await this.entity.save(payload);
  }

  async deleteByVariantProductId(id: string): Promise<void> {
    await this.entity.delete({ variant_product: { id } });
  }
}
