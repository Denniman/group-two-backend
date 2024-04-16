import httpStatus from "http-status";
import { TokenExpiredError } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import prisma from "../config/prisma";
import sendResponse from "../helpers/response";
import authService from "../services/auth.service";
import { ExpressResponseInterface } from "typings/helpers";
import { AuthPolicyInterface } from "../../typings/policies";
import { SessionInterface, MerchantTokenType } from "../../typings/merchant";

/**
 *
 * @class
 * @extends AuthPolicyInterface
 * @classdesc Authenticate merchant, customers middleware
 * @description App authentication policy controller
 * @name AuthPolicy
 */

export default class AuthPolicy extends AuthPolicyInterface {
  /**
   * method representing the Authorization check for authenticated users
   * @method hasAccessToken
   * @description Authenticate merchants, customers middleware
   * @param {Request} req - Request object
   * @param {Response} res - Response object
   * @param {callback} next - The callback that passes the request
   * @returns {ExpressResponseInterface} {ExpressResponseInterface} Returns the Response object containing token field with the verified token assigned to the user
   */

  static async hasAccessToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): ExpressResponseInterface {
    const [bearer, signature] = req?.header("Authorization")?.split(" ") || [];

    if (signature && bearer === "Bearer") {
      try {
        const token = await authService.verifyAccessToken(signature);
        req.token = token as unknown as MerchantTokenType;
        return next?.();
      } catch (error) {
        const message = `${error instanceof TokenExpiredError ? "Expired" : "Invalid"} token`;
        return res
          .status(httpStatus.UNAUTHORIZED)
          .json(sendResponse({ message, status: httpStatus.UNAUTHORIZED }));
      }
    }

    return res.status(httpStatus.UNAUTHORIZED).json(
      sendResponse({
        message: "No Token found",
        status: httpStatus.UNAUTHORIZED,
      })
    );
  }

  /**
   * method representing the Authorization token refresher for unauthorized users
   * @method hasRefreshToken
   * @description Refresh merchants, client access_token middleware
   * @param {Request} req - HTTP Request object
   * @param {Response} res - HTTP Response object
   * @param {NextFunction} next - HTTP NextFunction function
   * @returns {ExpressResponseInterface} {ExpressResponseInterface} Returns the Response object containing token field with the refreshed token assigned to the user
   * @memberof AuthPolicyInterface
   */
  static async hasRefreshToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): ExpressResponseInterface {
    const { refreshToken }: Pick<SessionInterface, "refreshToken"> = req.body;
    try {
      const token = await authService.verifyRefreshToken(refreshToken);
      const session = await prisma.session.findFirst({
        where: {
          userId: token?.aud as string,
        },
      });

      if (!session || session.refreshToken !== refreshToken) {
        return res.status(httpStatus.UNAUTHORIZED).json(
          sendResponse({
            message: "Invalid Token",
            status: httpStatus.UNAUTHORIZED,
          })
        );
      }

      req.token = token as unknown as MerchantTokenType;
      return next();
    } catch (error) {
      const message = `${error instanceof TokenExpiredError ? "Expired" : "Invalid"} token`;
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json(sendResponse({ message, status: httpStatus.UNAUTHORIZED }));
    }
  }
}
