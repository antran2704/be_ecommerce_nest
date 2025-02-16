import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";

import { IAdminInventoryService } from "../interfaces/admin_product_service.interface";
import { AdminInventoryRepository } from "../repositories/admin_inventory.repository";
import {
  AdminCreateProductInventoryRequestDto,
  AdminGetProductInventoryRequestDto,
  AdminGetProductInventoryResponseDto,
  AdminUpdateProductInventoryRequestDto,
} from "../dtos/services";
import { AdminCreateInventoryDto } from "../dtos/repositories";
import { InventoryEntity } from "../entities/inventory.entity";
import { ENUM_PAGINATION_ORDER } from "~/common/pagination/enums/order.enum";

export class AdminInventoryService implements IAdminInventoryService {
  constructor(
    private readonly inventoryRepository: AdminInventoryRepository,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async getProductInventories(
    payload: AdminGetProductInventoryRequestDto,
  ): Promise<AdminGetProductInventoryResponseDto[]> {
    const data = await this.inventoryRepository.findByProductId(payload);
    const formatData = this.mapper.mapArray(
      data,
      InventoryEntity,
      AdminGetProductInventoryResponseDto,
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
    const formatData: AdminCreateInventoryDto = {
      stock: payload.stock,
      product_id: payload.productId,
    };

    await this.inventoryRepository.create(formatData);
  }

  async updateProductInventory(
    id: string,
    payload: AdminUpdateProductInventoryRequestDto,
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
      this.inventoryRepository.create({
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
