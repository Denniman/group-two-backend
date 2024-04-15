/**
 * @description Response builder function for user requests
 * @function Response
 * @typedef ResponseInterface
 * @param {object} ResponseInterface - response payload object
 * @returns {ResponseInterface} {ResponseInterface} Returns the Response object
 */

import { ResponseInterface } from "../../typings/helpers";

export default function Response({
  status,
  message,
  payload = null,
}: ResponseInterface): ResponseInterface {
  return { message, payload, status };
}
