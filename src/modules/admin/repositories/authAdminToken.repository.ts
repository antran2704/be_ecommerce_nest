import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { IAuthAdminTokenRepository } from "../interfaces/auth_admin_token_repositoty.interface";
import { AuthAdminTokenEntity } from "../entities/auth_admin_token.entity";
import { AdminEntity } from "../entities/admin.entity";

@Injectable()
export class AuthAdminTokenRepository implements IAuthAdminTokenRepository {
  constructor(
    @InjectRepository(AuthAdminTokenEntity)
    private readonly authAdminTokenEntity: Repository<AuthAdminTokenEntity>,
  ) {}

  async create(data: AdminEntity): Promise<void> {
    const adminAuthToken = this.authAdminTokenEntity.create({
      user: data,
    });

    await this.authAdminTokenEntity.save(adminAuthToken);
  }
}
