import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { IAuthAdminTokenRepository } from "../interfaces/auth_admin_token_repositoty.interface";
import { AuthAdminToken } from "../entities/auth_admin_token.entity";

@Injectable()
export class AuthAdminTokenRepository implements IAuthAdminTokenRepository {
  constructor(
    @InjectRepository(AuthAdminToken)
    private readonly authAdminTokenEntity: Repository<AuthAdminToken>,
  ) {}

  async create(userId: string): Promise<void> {
    const adminAuthToken = this.authAdminTokenEntity.create({
      user_id: userId,
      
    });

    // save auth token of user
    await this.authAdminTokenEntity.save(adminAuthToken);
  }
}
