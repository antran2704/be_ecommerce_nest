import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";

import {
  AdminCreateProductInventoryRequestDto,
  AdminGetProductInventoryRequestDto,
  AdminGetInventoryResponseDto,
  AdminUpdateInventoryRequestDto,
} from "../dtos/services";
import { AdminCreateProductInventoryDto } from "../dtos/repositories";
import { InventoryEntity } from "../entities/inventory.entity";
import { ENUM_PAGINATION_ORDER } from "~/common/pagination/enums/order.enum";
import { IAdminProductInventoryService } from "../interfaces";
import { AdminProductInventoryRepository } from "../repositories/admin_product_inventory.repository";

export class AdminProductInventoryService
  implements IAdminProductInventoryService
{
  constructor(
    private readonly inventoryRepository: AdminProductInventoryRepository,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async getProductInventories(
    payload: AdminGetProductInventoryRequestDto,
  ): Promise<AdminGetInventoryResponseDto[]> {
    const data = await this.inventoryRepository.findByProductId(payload);
    const formatData = this.mapper.mapArray(
      data,
      InventoryEntity,
      AdminGetInventoryResponseDto,
    );

    return formatData;
  }

  async getProductInventory(id: string): Promise<number> {
    const data = await this.inventoryRepository.findByProductId({
      productId: id,
    });
    const stock = data.reduce((acc, item) => acc + item.stock, 0);
    return stock;
  }

  async createProductInventory(
    payload: AdminCreateProductInventoryRequestDto,
  ): Promise<void> {
    const formatData: AdminCreateProductInventoryDto = {
      stock: payload.stock,
      product_id: payload.productId,
    };

    await this.inventoryRepository.create(formatData);
  }

  async updateProductInventory(
    id: string,
    payload: AdminUpdateInventoryRequestDto,
  ) {
    // get all inventories
    const inventories = await this.inventoryRepository.findByProductId({
      productId: id,
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
        product_id: id,
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

  async deleteProductIventory(id: string): Promise<void> {
    await this.inventoryRepository.deleteByProductId(id);
  }
}
