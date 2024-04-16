import { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { ExpressResponseInterface } from "./helpers";
import { MerchantInterface } from "../typings/merchant";

export abstract class AuthControllerInterface {
  /**
   * @async
   * @method signup
   * @param {object} req
   * @param {object} res
   * @returns {ExpressResponseInterface}
   * @memberof AuthControllerInterface
   */
  public static signup: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => ExpressResponseInterface;

  /**
   * @async
   * @method signup
   * @param {object} ExpressResponseInterface
   * @param {object} res
   * @returns {ExpressResponseInterface}
   * @memberof AuthControllerInterface
   */
  public static signin: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => ExpressResponseInterface;

  /**
   * @async
   * @method forgotPassword
   * @param {object} req
   * @param {object} res
   * @returns {ExpressResponseInterface}
   * @memberof AuthControllerInterface
   */
  public static forgotPassword: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => ExpressResponseInterface;

  public static signout: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => ExpressResponseInterface;
}

/**
 * Auth Service Interface
 */

export abstract class AuthServiceInterface {
  /**
   * @method issueAccessToken
   * @param { MerchantInterface} payload
   * @returns {Promise<string>}
   */
  public static issueAccessToken: (payload: MerchantInterface) => Promise<string>;

  /**
   * @method issueRefreshToken
   * @param { MerchantInterface} payload
   * @returns {Promise<string>}
   */
  public static issueRefreshToken: (payload: MerchantInterface) => Promise<string>;

  /**
   * @method verifyAccessToken
   * @param {string} access_token
   * @returns {Promise<JwtPayload | undefined>}
   */
  public static verifyAccessToken: (access_token: string) => Promise<JwtPayload | undefined>;

  /**
   * @method verifyRefreshToken
   * @param {string} refresh_token
   * @returns {Promise<JwtPayload | undefined>}
   */
  public static verifyRefreshToken: (refresh_token: string) => Promise<JwtPayload | undefined>;
}
