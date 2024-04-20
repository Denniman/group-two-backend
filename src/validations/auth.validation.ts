import { Joi, Segments } from "celebrate";
import { AuthValidationInterface } from "typings/authValdiation";
import { CustomerValidation } from "typings/customerValidation";

/**
 * Object representing the Validation check for app auth HTTP requests
 * @description Validate user inputs on both POST, PUT, UPDATE and PATCH request
 */

export default {
  /**
   * @description Validate user signup inputs
   * @param {body} req - Request property object gotten from the request
   * @property {password} body.password - User password
   * @property {firstName} body.firstName - User full name
   * @property {lastName} body.lastName - User full name
   * @property {email} body.email - User email address
   * @returns {AuthValidationInterface} {AuthValidationInterface} Returns the Request object after validating user inputs from req.body
   */
  signupUser: {
    [Segments.BODY]: Joi.object<AuthValidationInterface>().keys({
      firstName: Joi.string().required(),

      password: Joi.string().min(6).max(20).required(),

      lastName: Joi.string().min(1).max(255).required(),

      email: Joi.string().email().lowercase().required(),
    }),
  },

  /**
   * @description Validate user signin inputs
   * @param {body} req - Request property object gotten from the request
   * @property {password} body.password - User password
   * @property {email} body.email - User email address
   * @returns {AuthValidationInterface} {AuthValidationInterface} Returns the Request object after validating user inputs from req.body
   */
  login: {
    [Segments.BODY]: Joi.object<Pick<AuthValidationInterface, "email" | "password">>().keys({
      password: Joi.string().required(),
      email: Joi.string().email().required(),
    }),
  },
  /**
   * @description Validate user signin inputs
   * @param {body} req - Request property object gotten from the request
   * @property {password} body.password - User password
   * @property {email} body.email - User email address
   * @returns {AuthValidationInterface} {AuthValidationInterface} Returns the Request object after validating user inputs from req.body
   */
  signUpCustomer: {
    [Segments.BODY]: Joi.object<CustomerValidation>().keys({
      password: Joi.string().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      storeName: Joi.string().required(),
      email: Joi.string().email().required(),
    }),
  },
};
