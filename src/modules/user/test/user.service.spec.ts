import { Repository } from "typeorm";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { UserService } from "../services/user.service";
import { UserEntity } from "../entities/user.entity";
import { UserRepository } from "../repositories/user.repository";
import { createUserByAdminMock } from "../mocks/user_service.mock";
import { JwtStrategy } from "~/common/auth/strategies/jwt.strategy";
import { UserAuthTokenService } from "~/modules/auth_token/services";
import { AuthCommonService } from "~/common/auth/services/auth.service";
import { AuthProviderService } from "~/modules/auth_provider/services/auth_provider.service";
import { GetUserReponseMapper } from "../mappers/get_user_response.mapper";
import { createMapper } from "@automapper/core";
import { AutomapperModule, getMapperToken } from "@automapper/nestjs";
import { classes } from "@automapper/classes";
import { AuthTokenEntity } from "~/modules/auth_token/entities/auth_token.entity";
import { UserAuthTokenRepository } from "~/modules/auth_token/repositories";
import { JwtService } from "@nestjs/jwt";
import { AuthProviderRepository } from "~/modules/auth_provider/repositories/auth_provider.repository";
import { AuthProviderEntity } from "~/modules/auth_provider/entities/auth_provider.entity";

describe("UserService test case", () => {
  let userService: UserService;
  let repository: Repository<UserEntity>;

  const mockUserRepository = {
    findOneBy: jest.fn().mockResolvedValue(null),
    create: jest.fn().mockReturnValue(createUserByAdminMock),
    save: jest.fn().mockResolvedValue(createUserByAdminMock),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AutomapperModule],
      providers: [
        UserService,
        UserRepository,
        UserAuthTokenService,
        UserAuthTokenRepository,
        AuthCommonService,
        JwtService,
        AuthProviderService,
        AuthProviderRepository,
        GetUserReponseMapper,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockUserRepository,
        },
        { provide: getRepositoryToken(AuthTokenEntity), useValue: {} },
        { provide: getRepositoryToken(AuthProviderEntity), useValue: {} },
        {
          provide: getMapperToken(),
          useValue: createMapper({
            strategyInitializer: classes(),
          }),
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    repository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it("should be defined", () => {
    expect(userService).toBeDefined();
  });

  it("createUserByAdmin", async () => {
    // jest.spyOn(repository, "save").mockResolvedValue(createUserByAdminMock);

    expect(
      await userService.createUserByAdmin({
        email: "phamtrangiaan30@gmail.com",
        password: "123456",
        name: "antran",
      }),
    ).toEqual(createUserByAdminMock);
  });
});
