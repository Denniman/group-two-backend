import { JwtPayload } from "jsonwebtoken";

export interface MerchantInterface {
  id: string;
  email: string;
  role: string;
  businessId: string | null;
  password: string;
  isAdmin: boolean;
}

export type UserSessionInterface = Pick<
  MerchantInterface,
  "businessId" | "password" | "id" | "role"
> & {
  firstName: string;
  lastName: string;
};

export interface SessionInterface {
  accessToken: string;
  /**
   * A timestamp of when the token was issued. Returned when a login is confirmed.
   */
  issuedAt: number;
  /**
   * The number of seconds until the token expires (since it was issued). Returned when a login is confirmed.
   */
  expiresIn: number;
  /**
   * A timestamp of when the token will expire. Returned when a login is confirmed.
   */
  expiresAt: Date;
  refreshToken: string;
  user: Partial<MerchantInterface>;
}

export interface MerchantTokenType extends Omit<JwtPayload, "aud"> {
  userId: string;
  email: string;
}
