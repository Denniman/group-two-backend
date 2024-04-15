/**
 * @extends Error
 */

import httpStatus from "http-status";
import { HttpExceptionInterface } from "../../typings/helpers";

class HttpException extends Error {
  status: number | null;
  errorTag: string;
  isPublic: boolean | undefined = false;
  errorData?: Record<string, any> | null = null;
  isOperational: boolean;

  constructor({
    message,
    status,
    isPublic,
    errorData,
    errorTag = "Internal Error",
    stack,
  }: HttpExceptionInterface) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errorTag = errorTag;
    this.status = status;
    this.errorData = errorData;
    this.isPublic = isPublic;
    this.isOperational = true; // This is required since bluebird 4 doesn't append it anymore.
    this.stack = stack;
  }
}

/**
 * Class representing an API error.
 * @extends HttpException
 */

class APIError extends HttpException {
  /**
   * Creates an API error.
   * @param {string} message - Error message.
   * @param {object | null} errorData - Error details.
   * @param {string | undefined} stack - call stack trace for error.
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   */

  constructor({
    stack,
    message,
    errorTag,
    errorData,
    isPublic = false,
    status = httpStatus.INTERNAL_SERVER_ERROR,
  }: HttpExceptionInterface) {
    super({
      stack,
      status,
      message,
      errorTag,
      isPublic,
      errorData,
    });
  }
}

export default APIError;
