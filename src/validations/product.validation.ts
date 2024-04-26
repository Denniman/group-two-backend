import { Joi, Segments } from "celebrate";
import { ProductsInterface } from "typings/products";

/**
 * Object representing the Validation check for app auth HTTP requests
 * @description Validate user inputs on both POST, PUT, UPDATE and PATCH request
 */

export default {
  /**
   * @description Validate product creation
   * @param {body} req - Request property object gotten from the request
   * @property {password} body.productName - product productName
   * @property {firstName} body.quantity - product quantity
   * @property {lastName} body.batchNumber - product batchNumber
   * @property {email} body.productImage -  productImage
   * @property {email} body.description - products description
   * @returns {ProductsInterface} {ProductsInterface} Returns the Request object after validating user inputs from req.body
   */
  createProduct: {
    [Segments.BODY]: Joi.object<ProductsInterface>().keys({
      productName: Joi.string().required(),
      quantity: Joi.number().required(),
      amount: Joi.number().required(),
      description: Joi.string().required(),
      categoryName: Joi.string().required(),
      productImage: Joi.any().required(),
      batchNumber: Joi.string().required(),
    }),
  },
};
