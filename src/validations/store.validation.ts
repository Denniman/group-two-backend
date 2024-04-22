import { Joi, Segments } from "celebrate";
import { StoreValidation } from "typings/storeValidation";

/**
 * Object representing the Validation check for app auth HTTP requests
 * @description Validate user inputs on both POST, PUT, UPDATE and PATCH request
 */

export default {
  /**
   * @description Validate store creation
   * @param {body} req - Request property object gotten from the request
   * @property {storeName} body.storeName - store name
   * @property {storeDescription} body.storeDescription - User email address
   * @returns {StoreValidation} {StoreValidation} Returns the Request object after validating user inputs from req.body
   */
  createStore: {
    [Segments.BODY]: Joi.object<StoreValidation>().keys({
      storeName: Joi.string().required(),
      color: Joi.string().optional(),
      backgroundColor: Joi.string().required(),
      storeBannerImage: Joi.string().optional(),
      fontStyle: Joi.string().required().optional(),
      storeDescription: Joi.string().min(6).optional(),
    }),
  },
};
