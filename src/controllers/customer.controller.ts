import httpStatus from "http-status";
import { Request, Response, NextFunction } from "express";

import sendResponse from "../helpers/response";
import CustomerModel from "../Models/customer.model";
import { CustomerControllerInterface } from "../../typings/customer";
import { ExpressResponseInterface } from "../../typings/helpers";

export default class CustomerController extends CustomerControllerInterface {
  /**
   * Route: POST: /customer/getStore
   * @async
   * @method getStore
   * @description signup a new user
   * @param {Request} req - HTTP Request object
   * @param {Response} res - HTTP Response object
   * @param {NextFunction} next - HTTP NextFunction object
   * @returns {ExpressResponseInterface} {ExpressResponseInterface}
   * @memberof CustomerController
   */

  static async getStore(req: Request, res: Response, next: NextFunction): ExpressResponseInterface {
    try {
      const { storeName } = req.body;

      const getMerchantStore = await CustomerModel.getMerchantStore(storeName);

      return res.status(httpStatus.OK).json(
        sendResponse({
          payload: getMerchantStore,
          message: "success",
          status: httpStatus.OK,
        })
      );
    } catch (error) {
      return next(error);
    }
  }
  
  
  static async createTransaction(
    req: Request,
    res: Response,
    next: NextFunction
  ): ExpressResponseInterface {
    try {
      const customerTransaction = await customerModel.create_transaction({ ...req.body });

      return res.status(httpStatus.CREATED).json(
        sendResponse({
          payload: customerTransaction,
          message: "success",
          status: httpStatus.CREATED,
        })
      );
    } catch (error) {
      return next(error);
    }
  }
}
