import httpStatus from "http-status";
import { Request, Response, NextFunction } from "express";

import sendResponse from "../helpers/response";
import MerchantModel from "../Models/merchant.model";
import CustomerModel from "../Models/customer.model";
import { AuthControllerInterface } from "../../typings/auth";
import { ExpressResponseInterface } from "../../typings/helpers";

/**
 *
 * @class
 * @extends AuthControllerInterface
 * @classdesc Class representing the authentication controller
 * @description App authentication controller
 * @name AuthController
 *
 */

export default class AuthController extends AuthControllerInterface {
  /**
   * Route: POST: /auth/signup
   * @async
   * @method signup
   * @description signup a new user
   * @param {Request} req - HTTP Request object
   * @param {Response} res - HTTP Response object
   * @param {NextFunction} next - HTTP NextFunction object
   * @returns {ExpressResponseInterface} {ExpressResponseInterface}
   * @memberof AuthController
   */
  static async signup(req: Request, res: Response, next: NextFunction): ExpressResponseInterface {
    try {
      await MerchantModel.signup({ ...req.body });

      return res.status(httpStatus.CREATED).json(
        sendResponse({
          message: "success",
          status: httpStatus.CREATED,
        })
      );
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Route: POST: /auth/signin
   * @async
   * @method signin
   * @description signin a registered user
   * @param {Request} req - HTTP Request object
   * @param {Response} res - HTTP Response object
   * @param {NextFunction} next -  HTTP NextFunction object
   * @returns {ExpressResponseInterface} {ExpressResponseInterface}
   * @memberof AuthController
   */

  static async signin(req: Request, res: Response, next: NextFunction): ExpressResponseInterface {
    try {
      const loginUser = await MerchantModel.login({ ...req.body });

      return res.status(httpStatus.OK).json(
        sendResponse({
          payload: loginUser,
          message: "success",
          status: httpStatus.OK,
        })
      );
    } catch (error) {
      return next(error);
    }
  }
  static async signUpCustomer(
    req: Request,
    res: Response,
    next: NextFunction
  ): ExpressResponseInterface {
    try {
      const customer = await CustomerModel.create({ ...req.body });

      return res.status(httpStatus.CREATED).json(
        sendResponse({
          payload: customer,
          message: "success",
          status: httpStatus.CREATED,
        })
      );
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Route: POST: /auth/logout
   * @async
   * @method logout
   * @description log out a user
   * @param {Request} req - HTTP Request object
   * @param {Response} res - HTTP Response object
   * @param {NextFunction} next - HTTP NextFunction object
   * @returns {ExpressResponseInterface} {ExpressResponseInterface}
   * @memberof AuthController
   */
  static async logout(_req: Request, res: Response, next: NextFunction): ExpressResponseInterface {
    try {
      
      return res.status(httpStatus.OK).json(
        sendResponse({
          message: "User logged out successfully",
          status: httpStatus.OK,
        })
      );
    } catch (error) {
      return next(error);
    }
  }
}

