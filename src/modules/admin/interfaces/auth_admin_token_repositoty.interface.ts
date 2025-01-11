import { AdminEntity } from "../entities/admin.entity";

export interface IAuthAdminTokenRepository {
  create(data: AdminEntity): Promise<void>;
}
