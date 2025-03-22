import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { BadRequestException } from "@nestjs/common";

import { GetDatabaseDefaultID } from "~/helpers/database";
import { ENUM_PREFIX_DATABASE } from "~/common/database/enums/perfix.enum";

import { IEntitesAndPaginationReponse } from "~/common/pagination/interfaces/pagination.interface";
import { ICartService } from "../interfaces/cart_service.interface";
import { CartRepository } from "../repositories/cart.repository";
import { GetCartResponseDto, GetCartsRequestDto } from "../dtos/services";
import { CartEntity } from "../entities/cart.entity";
import { CART_ERROR_MESSAGES } from "../messages/cart";
import { CreateCartDto, UpdateCartTotalDto } from "../dtos/repositories";
import CreateCartRequestDto from "../dtos/services/create_cart_request.dto";
import { ENUM_CARD_STATUS } from "../enums/cart.enum";

export class CartService implements ICartService {
  constructor(
    private readonly repository: CartRepository,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async getCarts(
    payload: GetCartsRequestDto,
  ): Promise<IEntitesAndPaginationReponse<GetCartResponseDto>> {
    const { data, pagination } = await this.repository.find(payload);
    const formatData = this.mapper.mapArray(
      data,
      CartEntity,
      GetCartResponseDto,
    );

    return { data: formatData, pagination };
  }

  async getCartEntity(id: string): Promise<CartEntity> {
    const entity = await this.repository.findById(id);

    if (!entity) throw new BadRequestException(CART_ERROR_MESSAGES.NOT_FOUND);

    return entity;
  }

  async getCartByUserId(id: string): Promise<GetCartResponseDto> {
    const entity = await this.repository.findByUserId(id);

    if (!entity) throw new BadRequestException(CART_ERROR_MESSAGES.NOT_FOUND);

    const formatData = this.mapper.map(entity, CartEntity, GetCartResponseDto);
    return formatData;
  }

  async createCart(payload: CreateCartRequestDto): Promise<void> {
    const cart = await this.repository.findByUserId(payload.user.id);

    if (cart) throw new BadRequestException(CART_ERROR_MESSAGES.IS_EXITED);

    const cartId = GetDatabaseDefaultID(ENUM_PREFIX_DATABASE.CAR);

    const formatData: CreateCartDto = {
      id: cartId,
      status: payload.status,
      total: 0,
      user: payload.user,
    };

    await this.repository.create(formatData);
  }

  async updateCartTotal(
    id: string,
    payload: UpdateCartTotalDto,
  ): Promise<void> {
    const cart = await this.repository.findById(id);

    if (!cart) throw new BadRequestException(CART_ERROR_MESSAGES.NOT_FOUND);

    const { total } = payload;

    cart.total = total;

    await this.repository.save(cart);
  }

  async enableCart(id: string): Promise<void> {
    const cart = await this.repository.findById(id);

    if (!cart) throw new BadRequestException(CART_ERROR_MESSAGES.NOT_FOUND);

    if (cart.status === ENUM_CARD_STATUS.ACTIVE)
      throw new BadRequestException(CART_ERROR_MESSAGES.WAS_ENABLED);

    cart.status = ENUM_CARD_STATUS.ACTIVE;

    await this.repository.save(cart);
  }

  async disableCart(id: string): Promise<void> {
    const cart = await this.repository.findById(id);

    if (!cart) throw new BadRequestException(CART_ERROR_MESSAGES.NOT_FOUND);

    if (cart.status === ENUM_CARD_STATUS.INACTIVE)
      throw new BadRequestException(CART_ERROR_MESSAGES.WAS_DISABLED);

    cart.status = ENUM_CARD_STATUS.INACTIVE;

    await this.repository.save(cart);
  }

  async enableCartByUserId(id: string): Promise<void> {
    const cart = await this.repository.findByUserId(id);
    if (!cart) throw new BadRequestException(CART_ERROR_MESSAGES.NOT_FOUND);

    if (cart.status === ENUM_CARD_STATUS.ACTIVE)
      throw new BadRequestException(CART_ERROR_MESSAGES.WAS_ENABLED);

    cart.status = ENUM_CARD_STATUS.ACTIVE;

    await this.repository.save(cart);
  }

  async disableCartByUserId(id: string): Promise<void> {
    const cart = await this.repository.findByUserId(id);

    if (!cart) throw new BadRequestException(CART_ERROR_MESSAGES.NOT_FOUND);

    if (cart.status === ENUM_CARD_STATUS.INACTIVE)
      throw new BadRequestException(CART_ERROR_MESSAGES.WAS_DISABLED);

    cart.status = ENUM_CARD_STATUS.INACTIVE;

    await this.repository.save(cart);
  }

  async deleteCart(id: string): Promise<void> {
    const cart = await this.repository.findByUserId(id);

    if (!cart) throw new BadRequestException(CART_ERROR_MESSAGES.NOT_FOUND);

    await this.repository.delete(id);
  }
}
