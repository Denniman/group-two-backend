import { Axios, AxiosError } from "axios";
import httpStatus from "http-status";
import { isCelebrateError } from "celebrate";
import { JsonWebTokenError } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { ValidationError as JoiValidationError } from "joi";

import config from "../config";
import APIError from "../helpers/api_errors";
import { ErrorServiceInterface } from "../../typings/error";
import joiErrorFormatter from "../helpers/joiErrorFormatter";

/**
 *
 * @class ErrorService
 * @classdesc Class representing the error service
 * @description App error service class
 * @name ErrorService
 * @exports ErrorServiceInterface
 */

export default class ErrorService extends ErrorServiceInterface {
  /**
   * @method handler
   * @description app error handler
   * @param {ExpressErrorInterface} error - ExpressErrorInterface object
   * @param {Request} req - HTTP Request object
   * @param {Response} res - HTTP Response object
   * @param {NextFunction} next - HTTP NextFunction function
   * @returns {void}
   * @memberof ErrorService
   */

  public static handler = (
    error: ExpressErrorInterface,
    _req: Request,
    res: Response,
    _next?: NextFunction
  ): void => {
    const response: ErrorResponseInterface = {
      payload: null,
      stack: error.stack,
      error: error.errors,
      status: error.status,
      message: error.message || String(httpStatus[error.status]),
      errorData: error.errorData,
    };

    if (config.env !== "development") {
      delete response?.stack;
    }

    ErrorService.reportError(response);
    res.status(error.status).json(response);
  };

  /**
   * @method converter
   * @description converter all app errors
   * @param {ExpressErrorInterface} error - ExpressErrorInterface object
   * @param {Request} req - HTTP Request object
   * @param {Response} res - HTTP Response object
   * @param {NextFunction} next - HTTP NextFunction function
   * @returns {void}
   * @memberof ErrorService
   */

  public static converter = (
    error: ExpressErrorInterface,
    req: Request,
    res: Response,
    _next: NextFunction
  ): void => {
    let convertedError: Error = error;

    if (isCelebrateError(error)) {
      convertedError = new APIError({
        status: httpStatus.BAD_REQUEST,
        message: JSON.stringify(
          joiErrorFormatter(error.details as unknown as Map<string, JoiValidationError>)
        ),
      });
    }

    if (error instanceof JsonWebTokenError) {
      convertedError = new APIError({
        message: error.message,
        status: httpStatus.UNAUTHORIZED,
      });
    }

    if (error instanceof Axios) {
      const axiosError = error as unknown as AxiosError;
      const err = axiosError.response?.data as AxiosError & {
        cause: string;
        statusCode: number;
      };

      convertedError = new APIError({
        errorData: err,
        stack: err.stack,
        status: err.statusCode,
        errorTag: "Chain Service Error",
        message: err?.cause || err.message,
      });
    }

    if (!(convertedError instanceof APIError)) {
      convertedError = new APIError({
        message: error.message,
        status: error.status,
        stack: error.stack,
      });
    }

    return ErrorService.handler(convertedError as unknown as ExpressErrorInterface, req, res);
  };

  /**
   * @method converter
   * @description catch app 404 errors
   * @param {Request} req - HTTP Request object
   * @param {Response} res - HTTP Response object
   * @returns {void}
   * @memberof ErrorService
   */

  public static notFound = (req: Request, res: Response): void => {
    const error = new APIError({
      message: "Not found",
      status: httpStatus.NOT_FOUND,
      stack: undefined,
    });

    return ErrorService.handler(error as unknown as ExpressErrorInterface, req, res);
  };

  /**
   * @method reportError
   * @description report api errors to our custom error service provider
   * @param {ErrorResponseInterface} error - HTTP Request object
   * @returns {ErrorResponseInterface}
   * @memberof ErrorService
   */

  public static reportError = (error: ErrorResponseInterface): ErrorResponseInterface => {
    // report to sentry or google crashlytics
    // report to app communication centers example -> slack etc
    return error;
  };
}
