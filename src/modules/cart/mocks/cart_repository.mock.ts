import { CartEntity } from "../entities/cart.entity";
import { ICartRepository } from "../interfaces/cart_repository.interface";
import { mockCartEntity } from "./cart_entity.mock";

const mockCartRepository: ICartRepository = {
  find: jest.fn().mockResolvedValue({
    data: [mockCartEntity as CartEntity],
    pagination: {
      page: 1,
      take: 10,
      total: 10,
      totalPages: 1,
    },
  }),
  findById: jest.fn().mockResolvedValue(mockCartEntity as CartEntity),
  findByUserId: jest.fn().mockResolvedValue(mockCartEntity as CartEntity),
  create: jest.fn().mockReturnValue(null),
  save: jest.fn().mockReturnValue(null),
  delete: jest.fn().mockReturnValue(null),
};

export { mockCartRepository };
