import { Test, TestingModule } from "@nestjs/testing";
import { createMapper } from "@automapper/core";
import { AutomapperModule, getMapperToken } from "@automapper/nestjs";
import { JwtService } from "@nestjs/jwt";
import { classes } from "@automapper/classes";

import { UserService } from "../services/user.service";
import { UserRepository } from "../repositories/user.repository";
import { UserAuthTokenService } from "~/modules/auth_token/services";
import { AuthCommonService } from "~/common/auth/services/auth.service";
import { AuthProviderService } from "~/modules/auth_provider/services/auth_provider.service";
import { GetUserReponseMapper } from "../mappers/get_user_response.mapper";
import { UserAuthTokenRepository } from "~/modules/auth_token/repositories";
import { AuthProviderRepository } from "~/modules/auth_provider/repositories/auth_provider.repository";
import { mockUserAuthTokenRepository } from "~/modules/auth_token/mocks/auth_token_repository.mock";
import { mockAuthProviderRepository } from "~/modules/auth_provider/mocks/auth_provider_repository.mock";
import { mockUserRepository } from "../mocks/user_repository.mock";
import { CartService } from "~/modules/cart/services/cart.service";
import { CartRepository } from "~/modules/cart/repositories/cart.repository";
import { mockCartRepository } from "~/modules/cart/mocks/cart_repository.mock";

describe("UserService test case", () => {
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AutomapperModule],
      providers: [
        UserService,
        UserAuthTokenService,
        AuthCommonService,
        JwtService,
        AuthProviderService,
        CartService,
        GetUserReponseMapper,
        {
          provide: UserRepository,
          useValue: mockUserRepository,
        },
        {
          provide: UserAuthTokenRepository,
          useValue: mockUserAuthTokenRepository,
        },
        {
          provide: AuthProviderRepository,
          useValue: mockAuthProviderRepository,
        },
        {
          provide: CartRepository,
          useValue: mockCartRepository,
        },
        {
          provide: getMapperToken(),
          useValue: createMapper({
            strategyInitializer: classes(),
          }),
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it("should be defined", () => {
    expect(userService).toBeDefined();
  });
});
