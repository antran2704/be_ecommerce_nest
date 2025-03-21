import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { IEntitesAndPaginationReponse } from "~/common/pagination/interfaces/pagination.interface";
import { getEntitesAndPagination } from "~/common/pagination/helpers/pagination";
import { CartItemEntity } from "../entities/cart_item.entity";
import { GetCartItemsRequestDto } from "../dtos/services";
import { CreateCartItemDto } from "../dtos/repositories";
import { ICartItemRepository } from "../interfaces/cart_item_repository.interface";

export class CartItemRepository implements ICartItemRepository {
  constructor(
    @InjectRepository(CartItemEntity)
    private readonly entity: Repository<CartItemEntity>,
  ) {}

  async find(
    params: GetCartItemsRequestDto,
  ): Promise<IEntitesAndPaginationReponse<CartItemEntity>> {
    const { data, pagination } = await getEntitesAndPagination(
      this.entity,
      params,
      (query, originalNameEntity) => {
        // filter with cart id
        if (params.cardId) {
          query.where(`${originalNameEntity}.cart LIKE :id`, {
            id: params.cardId,
          });
        }
      },
    );

    return { data, pagination };
  }

  async findById(id: string): Promise<CartItemEntity> {
    return this.entity.findOneBy({ id });
  }

  async findByProductId(id: string): Promise<CartItemEntity> {
    return this.entity.findOneBy([
      { product: { id } },
      { variant_product: { id } },
    ]);
  }

  async create(payload: CreateCartItemDto): Promise<void> {
    const newEntity = this.entity.create(payload);
    await this.entity.save(newEntity);
  }

  async save(payload: CartItemEntity): Promise<void> {
    await this.entity.save(payload);
  }

  async delete(id: string): Promise<void> {
    await this.entity.delete({ id });
  }
}
