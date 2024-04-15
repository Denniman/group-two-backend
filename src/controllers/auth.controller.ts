import httpStatus from "http-status";
import { Request, Response, NextFunction } from "express";

import prisma from "../config/prisma";
import APIError from "../helpers/api_errors";
import sendResponse from "../helpers/response";
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
  static async signup(
    req: Request,
    res: Response,
    next: NextFunction,
  ): ExpressResponseInterface {
    try {
      const { email } = req.body;
      //   this unfinished work is just a template

      const userExits = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (userExits) {
        throw new APIError({
          status: httpStatus.BAD_REQUEST,
          message: "Account already registered with us",
        });
      }
      return res.status(httpStatus.CREATED).json(
        sendResponse({
          message: "success",
          status: httpStatus.CREATED,
        }),
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

  static async signin(
    _req: Request,
    _res: Response,
    next: NextFunction,
  ): ExpressResponseInterface {
    try {
    } catch (error) {
      // console.log(error);
      return next(error);
    }
  }

  /**
   * Route: POST: /auth/signout
   * @async
   * @method signout
   * @description invalidates a user session
   * @param {Request} req - HTTP Request object
   * @param {Response} res - HTTP Response object
   * @param {NextFunction} next - HTTP NextFunction object
   * @returns {ExpressResponseInterface} {ExpressResponseInterface}
   * @memberof AuthController
   */

  static async signout(
    _req: Request,
    _res: Response,
    next: NextFunction,
  ): ExpressResponseInterface {
    try {
    } catch (error) {
      next(error);
    }
  }

  /**
   * Route: POST: /auth/forgot-password
   * @async
   * @method forgotPassword
   * @description change merchants password
   * @param {Request} req - HTTP Request object
   * @param {Response} res - HTTP Response object
   * @param {NextFunction} next - HTTP NextFunction object
   * @returns {ExpressResponseInterface} {ExpressResponseInterface}
   * @memberof AuthController
   */

  static async forgotPassword(
    _req: Request,
    _res: Response,
    next: NextFunction,
  ): ExpressResponseInterface {
    try {
    } catch (error) {
      return next(error);
    }
  }
}
