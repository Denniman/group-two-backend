import { Request, Response, NextFunction } from "express";
import { ExpressResponseInterface } from "./helpers";

export abstract class CustomerControllerInterface {
  /*
   * @async
   * @method createTransaction
   * @param {object} req
   * @param {object} res
   * @returns {ExpressResponseInterface}
   */
  
  public static createTransaction: (
  req: Request,
    res: Response,
    next: NextFunction
  ) => ExpressResponseInterface;
  
  /*
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
