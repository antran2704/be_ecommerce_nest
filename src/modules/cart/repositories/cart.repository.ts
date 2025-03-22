import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { IEntitesAndPaginationReponse } from "~/common/pagination/interfaces/pagination.interface";
import { getEntitesAndPagination } from "~/common/pagination/helpers/pagination";
import { ICartRepository } from "../interfaces/cart_repository.interface";
import { CartEntity } from "../entities/cart.entity";
import { GetCartsRequestDto } from "../dtos/services";
import { CreateCartDto } from "../dtos/repositories";

export class CartRepository implements ICartRepository {
  constructor(
    @InjectRepository(CartEntity)
    private readonly entity: Repository<CartEntity>,
  ) {}

  async find(
    params: GetCartsRequestDto,
  ): Promise<IEntitesAndPaginationReponse<CartEntity>> {
    const { data, pagination } = await getEntitesAndPagination(
      this.entity,
      params,
      (query, originalNameEntity) => {
        // filter with id
        if (params.search) {
          query.where(`${originalNameEntity}.id LIKE :id`, {
            id: `${params.search}%`,
          });
        }

        // filter with status
        if (params.cardStatus) {
          query.andWhere(`${originalNameEntity}.status = :status`, {
            status: params.cardStatus,
          });
        }
      },
    );

    return { data, pagination };
  }

  async findByUserId(id: string): Promise<CartEntity> {
    return this.entity.findOneBy({ user: { id } });
  }

  async findById(id: string): Promise<CartEntity> {
    return this.entity.findOneBy({ id });
  }

  async create(payload: CreateCartDto): Promise<void> {
    const newEntity = this.entity.create(payload);
    await this.entity.save(newEntity);
  }

  async save(payload: CartEntity): Promise<void> {
    await this.entity.save(payload);
  }

  async delete(id: string): Promise<void> {
    await this.entity.delete({ id });
  }
}
