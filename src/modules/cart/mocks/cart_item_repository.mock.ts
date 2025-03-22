import { CartItemEntity } from "../entities/cart_item.entity";
import { ICartItemRepository } from "../interfaces/cart_item_repository.interface";
import { mockCartItemEntity } from "./cart_item_entity.mock";

const mockCartItemRepository: ICartItemRepository = {
  find: jest.fn().mockResolvedValue({
    data: [mockCartItemEntity as CartItemEntity],
    pagination: {
      page: 1,
      take: 10,
      total: 10,
      totalPages: 1,
    },
  }),
  findById: jest.fn().mockResolvedValue(mockCartItemEntity as CartItemEntity),
  findByProductId: jest
    .fn()
    .mockResolvedValue(mockCartItemEntity as CartItemEntity),
  create: jest.fn().mockReturnValue(null),
  save: jest.fn().mockReturnValue(null),
  delete: jest.fn().mockReturnValue(null),
};

export { mockCartItemRepository };
