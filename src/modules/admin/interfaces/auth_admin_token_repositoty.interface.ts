export interface IAuthAdminTokenRepository {
  create(userId: string): Promise<void>;
}
