import httpStatus from "http-status";
import { Request, Response, NextFunction } from "express";

import sendResponse from "../helpers/response";
import customerModel from "../Models/customer.model";
import { CustomerControllerInterface } from "../../typings/customer";
import { ExpressResponseInterface } from "../../typings/helpers";

/**
 *
 * @class
 * @extends CustomerController
 * @classdesc Class representing the authentication controller
 * @description App authentication controller
 * @name AuthController
 *
 */

export default class customerController extends CustomerControllerInterface {
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
