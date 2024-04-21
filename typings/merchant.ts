import { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { ExpressResponseInterface } from "./helpers";
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
  id: string;
  email: string;
}

export abstract class UserControllerInterface {
  /**
   * @async
   * @method createBusiness
   * @param {object} req
   * @param {object} res
   * @returns {ExpressResponseInterface}
   * @memberof UserControllerInterface
   */
  public static createBusiness: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => ExpressResponseInterface;
  /**
   * @async
   * @method createStore
   * @param {object} req
   * @param {object} res
   * @returns {ExpressResponseInterface}
   * @memberof UserControllerInterface
   */
  public static createStore: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => ExpressResponseInterface;

  /**
   * @async
   * @method getCustomers
   * @param {object} req
   * @param {object} res
   * @returns {ExpressResponseInterface}
   * @memberof UserControllerInterface
   */
  public static getCustomers: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => ExpressResponseInterface;

  /**
   * @async
   * @method getAccount
   * @param {object} req
   * @param {object} res
   * @returns {ExpressResponseInterface}
   * @memberof UserControllerInterface
   */
  public static getAccount: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => ExpressResponseInterface;

  /**
   * @async
   * @method getSettings
   * @param {object} req
   * @param {object} res
   * @returns {ExpressResponseInterface}
   * @memberof UserControllerInterface
   */
  public static getSettings: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => ExpressResponseInterface;
}
