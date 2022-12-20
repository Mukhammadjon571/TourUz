export interface IToken {
  id: number;
  issued_date: Date;
  access_token: string;
  refresh_token: string;
  access_token_expiration_date: Date;
  refresh_token_expiration_date: Date;
  given_to: number;
  is_active: boolean;
}

export interface IAccessTokenPayload {
  id: number;
  full_name: string;
  email: string;
  iat: number;
  exp: number;
}

export interface IRefreshTokenPayload {
  user_id: number;
  iat: number;
  exp: number;
}
