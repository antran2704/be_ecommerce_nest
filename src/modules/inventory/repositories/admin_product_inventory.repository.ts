import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { InventoryEntity } from "../entities/inventory.entity";
import { AdminGetProductInventoryRequestDto } from "../dtos/services";
import { ENUM_PAGINATION_ORDER } from "~/common/pagination/enums/order.enum";
import { AdminCreateProductInventoryDto } from "../dtos/repositories";
import { IAdminProductInventoryRepository } from "../interfaces";

export class AdminProductInventoryRepository
  implements IAdminProductInventoryRepository
{
  constructor(
    @InjectRepository(InventoryEntity)
    private readonly entity: Repository<InventoryEntity>,
  ) {}

  async findByProductId(
    payload: AdminGetProductInventoryRequestDto,
  ): Promise<InventoryEntity[]> {
    const data = await this.entity.find({
      where: { product: { id: payload.productId } },
      order: {
        updated_at:
          payload.order === ENUM_PAGINATION_ORDER.ASC
            ? ENUM_PAGINATION_ORDER.ASC
            : ENUM_PAGINATION_ORDER.DESC,
      },
    });

    return data;
  }

  async create(payload: AdminCreateProductInventoryDto): Promise<void> {
    const newEntity = this.entity.create(payload);
    await this.entity.save(newEntity);
  }

  async save(payload: InventoryEntity): Promise<void> {
    await this.entity.save(payload);
  }

  async deleteByProductId(id: string): Promise<void> {
    await this.entity.delete({ product: { id } });
  }
}
