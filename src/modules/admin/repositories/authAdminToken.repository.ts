import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { IAuthAdminTokenRepository } from "../interfaces/auth_admin_token_repositoty.interface";
import { AuthAdminToken } from "../entities/auth_admin_token.entity";
import { Admin } from "../entities/admin.entity";

@Injectable()
export class AuthAdminTokenRepository implements IAuthAdminTokenRepository {
  constructor(
    @InjectRepository(AuthAdminToken)
    private readonly authAdminTokenEntity: Repository<AuthAdminToken>,
  ) {}

  async create(data: Admin): Promise<void> {
    const adminAuthToken = this.authAdminTokenEntity.create({
      user: data
    });

    await this.authAdminTokenEntity.save(adminAuthToken);
  }
}
