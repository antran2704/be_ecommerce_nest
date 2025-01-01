interface IAccessTokenPayload {
  id: string;
  isAdmin: boolean;
}

interface IRefreshTokenPayload {
  id: string;
}

export type { IAccessTokenPayload, IRefreshTokenPayload };
