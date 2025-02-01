import { Repository } from "typeorm";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { UserService } from "../services/user.service";
import { UserEntity } from "../entities/user.entity";
import { UserRepository } from "../repositories/user.repository";
import { AuthCommonModule } from "../../../common/auth/auth.module";
import { AuthTokenModule } from "../../auth_token/auth_token.module";
import { AuthProviderModule } from "../../auth_provider/auth_provider.module";
import { createUserByAdminMock } from "../mocks/user_service.mock";

describe("UserService", () => {
  let userService: UserService;
  let repository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AuthCommonModule,
        AuthTokenModule,
        AuthProviderModule,
        AuthProviderModule,
      ],
      providers: [
        UserService,
        UserRepository,
        { provide: getRepositoryToken(UserEntity), useClass: Repository },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    repository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it("createUserByAdmin", async () => {
    jest.spyOn(repository, "save").mockResolvedValue(createUserByAdminMock);

    expect(
      await userService.createUserByAdmin({
        email: "phamtrangiaan27@gmail.com",
        password: "123456",
        name: "antran",
      }),
    ).toEqual(createUserByAdminMock);
  });
});
