import { Request, Response, NextFunction } from "express";
import { ExpressResponseInterface } from "./helpers";

export abstract class AuthPolicyInterface {
  /**
   * @async
   * @method authToken
   * @param {object} req
   * @param {object} res
   * @returns {ExpressResponseInterface}
   * @memberof AuthPolicyInterface
   */
  public static authToken: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => ExpressResponseInterface;

  /**
   * @async
   * @method hasRefreshToken
   * @param {object} req
   * @param {object} res
   * @returns {ExpressResponseInterface}
   * @memberof AuthPolicyInterface
   */
  public static hasRefreshToken: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => ExpressResponseInterface;
}
