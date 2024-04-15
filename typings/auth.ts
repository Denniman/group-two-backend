import { Request, Response, NextFunction } from "express";
import { ExpressResponseInterface } from "./helpers";

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
