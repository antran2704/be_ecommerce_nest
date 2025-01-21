import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { IAuthProviderRepository } from "../interfaces/auth_provider_repository.interface";
import { AuthProviderEntity } from "../entities/auth_provider.entity";
import CreateAuthProviderDto from "../dtos/repositories/create_auth_provider.dto";
import GetAuthProviderDto from "../dtos/repositories/get_auth_provider.dto";

@Injectable()
export class AuthProviderRepository implements IAuthProviderRepository {
  constructor(
    @InjectRepository(AuthProviderEntity)
    private readonly authProviderEntity: Repository<AuthProviderEntity>,
  ) {}

  async createAuthProvider(payload: CreateAuthProviderDto): Promise<void> {
    const user = this.authProviderEntity.create(payload);

    // save user
    await this.authProviderEntity.save(user);
  }

  async getAuthProvider(data: GetAuthProviderDto): Promise<AuthProviderEntity> {
    return await this.authProviderEntity.findOneBy({
      providerId: data.providerId,
    });
  }
}
