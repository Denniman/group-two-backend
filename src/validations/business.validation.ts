import { Joi, Segments } from "celebrate";
import { BusinessValidationInterface } from "typings/businessValidation";

/**
 * Object representing the Validation check for app auth HTTP requests
 * @description Validate user inputs on both POST, PUT, UPDATE and PATCH request
 */

export default {
  /**
   * @description Validate user business KYC inputs
   * @param {body} req - Request property object gotten from the request
   * @property {password} body.businessName - Business Name
   * @property {firstName} body.businessLogo - Business logo
   * @property {lastName} body.phoneNumber - Business Phone Number
   * @property {email} body.businessEmail - Business email address
   * @property {email} body.businessDescription - Business Description
   * @returns {BusinessValidationInterface} {BusinessValidationInterface} Returns the Request object after validating KYC inputs from req.body
   */
  createBusiness: {
    [Segments.BODY]: Joi.object<BusinessValidationInterface>().keys({
      businessName: Joi.string().required(),

      businessLogo: Joi.string().min(6).max(255).required(),

      phoneNumber: Joi.string().min(11).max(255).required(),

      businessEmail: Joi.string().email().lowercase().required(),

      businessDescription: Joi.string().min(11).max(255).required(),

    }),
  },

};
