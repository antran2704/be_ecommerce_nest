import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { getEntitesAndPagination } from "src/common/pagination/helpers/pagination";
import { UserEntity } from "../entities/user.entity";
import { GetDatabaseDefaultID } from "src/helpers/database";
import {
  CreateUserDto,
  SearchUserRequestDto,
  SignupUserDto,
  UpdateUserDto,
} from "../dtos";
import { ENUM_USER_STATUS } from "../enums/user.enum";
import { IEntitesAndPaginationReponse } from "src/common/pagination/interfaces/pagination.interface";
import { ENUM_PREFIX_DATABASE } from "src/common/database/enums/perfix.enum";
import { IUserRepository } from "../interfaces/user_repository.interface";

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
  ) {}

  async createUserByAdmin(payload: CreateUserDto): Promise<UserEntity> {
    const userId = GetDatabaseDefaultID(ENUM_PREFIX_DATABASE.US);

    const user = this.userEntity.create({
      ...payload,
      id: userId,
    });

    // save user
    await this.userEntity.save(user);

    return user;
  }

  async createUser(payload: SignupUserDto): Promise<UserEntity> {
    const userId = GetDatabaseDefaultID(ENUM_PREFIX_DATABASE.US);

    const user = this.userEntity.create({
      ...payload,
      id: userId,
    });

    // save user
    await this.userEntity.save(user);

    return user;
  }

  async findUsers(
    params: SearchUserRequestDto,
  ): Promise<IEntitesAndPaginationReponse<UserEntity>> {
    const { data, pagination } = await getEntitesAndPagination(
      this.userEntity,
      params,
      (query, originalNameEntity) => {
        // filter with email or id
        if (params.search) {
          query.where(`${originalNameEntity}.id LIKE :id`, {
            id: `${params.search}%`,
          });

          query.orWhere(`${originalNameEntity}.email LIKE :email`, {
            email: `${params.search}%`,
          });
        }

        // filter with status
        if (params.status) {
          query.andWhere(`${originalNameEntity}.is_active = :status`, {
            status: params.status === ENUM_USER_STATUS.ACTIVE ? true : false,
          });
        }
      },
    );

    return { data, pagination };
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return await this.userEntity.findOneBy({
      email,
    });
  }

  async findByUserId(id: string): Promise<UserEntity> {
    return await this.userEntity.findOneBy({
      id,
    });
  }

  async findPermissions(id: string): Promise<UserEntity> {
    return await this.userEntity.findOne({
      where: { id },
      relations: ["role"],
    });
  }

  async updateUser(id: string, payload: UpdateUserDto): Promise<void> {
    await this.userEntity.update({ id }, payload);
  }

  async changePassword(id: string, password: string): Promise<void> {
    await this.userEntity.update({ id }, { password });
  }

  async enableUser(id: string): Promise<void> {
    await this.userEntity.update({ id }, { is_banned: false });
  }

  async disableUser(id: string): Promise<void> {
    await this.userEntity.update({ id }, { is_banned: true });
  }

  async activeUser(id: string): Promise<void> {
    await this.userEntity.update({ id }, { is_active: true });
  }

  async inactiveUser(id: string): Promise<void> {
    await this.userEntity.update({ id }, { is_active: false });
  }

  async deleteUser(id: string): Promise<void> {
    await this.userEntity.delete(id);
  }
}
