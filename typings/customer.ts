import { Request, Response, NextFunction } from "express";
import { ExpressResponseInterface } from "./helpers";

export abstract class CustomerControllerInterface {
  /**
   * @async
   * @method getStore
   * @param {object} req
   * @param {object} res
   * @returns {ExpressResponseInterface}
   * @memberof CustomerControllerInterface
   */
  public static getStore: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => ExpressResponseInterface;
}
