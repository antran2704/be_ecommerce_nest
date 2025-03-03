import { UserEntity } from "../entities/user.entity";

const mockUserEntity: UserEntity = {
  id: "1",
  name: "antran",
  email: "phamtrangiaan30@gmail.com",
  password: "123456",
  is_active: true,
  is_banned: false,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  authProviders: [],
  authToken: null,
};

export { mockUserEntity };
