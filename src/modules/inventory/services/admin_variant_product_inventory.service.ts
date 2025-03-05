import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";

import {
  AdminCreateVariantProductInventoryRequestDto,
  AdminGetInventoryResponseDto,
  AdminUpdateInventoryRequestDto,
  AdminGetVariantProductInventoryRequestDto,
} from "../dtos/services";
import { AdminCreateVariantProductInventoryDto } from "../dtos/repositories";
import { InventoryEntity } from "../entities/inventory.entity";
import { ENUM_PAGINATION_ORDER } from "~/common/pagination/enums/order.enum";
import { IAdminVariantProductInventoryService } from "../interfaces";
import { AdminVariantProductInventoryRepository } from "../repositories/admin_variant_product_inventory.repository";

export class AdminVariantProductInventoryService
  implements IAdminVariantProductInventoryService
{
  constructor(
    private readonly inventoryRepository: AdminVariantProductInventoryRepository,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async getVariantProductInventories(
    payload: AdminGetVariantProductInventoryRequestDto,
  ): Promise<AdminGetInventoryResponseDto[]> {
    const data = await this.inventoryRepository.findByVariantProductId(payload);
    const formatData = this.mapper.mapArray(
      data,
      InventoryEntity,
      AdminGetInventoryResponseDto,
    );

    return formatData;
  }

  async getVariantProductInventory(id: string): Promise<number> {
    const data = await this.inventoryRepository.findByVariantProductId({
      variantProductId: id,
    });
    const stock = data.reduce((acc, item) => acc + item.stock, 0);
    return stock;
  }

  async createVariantProductInventory(
    payload: AdminCreateVariantProductInventoryRequestDto,
  ): Promise<void> {
    const formatData: AdminCreateVariantProductInventoryDto = {
      stock: payload.stock,
      variant_product_id: payload.varaintProductId,
    };

    await this.inventoryRepository.create(formatData);
  }

  async updateVariantProductInventory(
    id: string,
    payload: AdminUpdateInventoryRequestDto,
  ) {
    // get all inventories
    const inventories = await this.inventoryRepository.findByVariantProductId({
      variantProductId: id,
      order: ENUM_PAGINATION_ORDER.ASC,
    });

    // Total stock
    const currentStock = inventories.reduce((sum, inv) => sum + inv.stock, 0);
    const newStock = payload.stock;

    // Return if no change
    if (currentStock === newStock) return;

    if (currentStock < newStock) {
      // 🟢 Case 1: Increase stock
      const stockToAdd = newStock - currentStock;
      await this.inventoryRepository.create({
        variant_product_id: id,
        stock: stockToAdd,
      });
    } else {
      // 🔴 Case 2: Decrese stock (Decrese from oldest record)
      let stockToRemove = currentStock - newStock;

      for (const inventory of inventories) {
        if (stockToRemove <= 0) break;

        if (inventory.stock >= stockToRemove) {
          // If stock of this inventory is enough
          inventory.stock -= stockToRemove;
          stockToRemove = 0;
        } else {
          // If stock of this inventory is not enough
          stockToRemove -= inventory.stock;
          inventory.stock = 0;
        }

        await this.inventoryRepository.save(inventory);
      }
    }
  }

  async deleteVariantProductIventory(id: string): Promise<void> {
    await this.inventoryRepository.deleteByVariantProductId(id);
  }
}
