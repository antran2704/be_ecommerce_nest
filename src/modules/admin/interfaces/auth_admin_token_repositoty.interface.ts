import { Admin } from "../entities/admin.entity";

export interface IAuthAdminTokenRepository {
  create(data: Admin): Promise<void>;
}
