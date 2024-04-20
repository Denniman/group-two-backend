import httpStatus from "http-status";
import { Request, Response, NextFunction } from "express";

import sendResponse from "../helpers/response";
import MerchantModel from "../Models/merchant.model";
import { UserControllerInterface } from "../../typings/merchant";
import { ExpressResponseInterface } from "../../typings/helpers";

/**
 *
 * @class
 * @extends MerchantController
 * @classdesc Class representing the authentication controller
 * @description App authentication controller
 * @name AuthController
 *
 */

export default class MerchantController extends UserControllerInterface {
  static async createStore(
    req: Request,
    res: Response,
    next: NextFunction
  ): ExpressResponseInterface {
    try {
      const { aud: id } = req.token;

      const merchantStore = await MerchantModel.createStore({ ...req.body, id });

      return res.status(httpStatus.CREATED).json(
        sendResponse({
          payload: merchantStore,
          message: "success",
          status: httpStatus.CREATED,
        })
      );
    } catch (error) {
      return next(error);
    }
  }
}
