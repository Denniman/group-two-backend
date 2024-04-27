import { Joi, Segments } from "celebrate";
import { TransactionValidation } from "typings/transactionValidation";

/**
 * Object representing the Validation check for app auth HTTP requests
 * @description Validate user inputs on both POST, PUT, UPDATE and PATCH request
 */

export default {
  /**
   * @description Validate transaction creation
   * @param {body} req - Request property object gotten from the request
   */
  createTransaction: {
    [Segments.BODY]: Joi.object<TransactionValidation>().keys({
      date: Joi.date().required(),
      quantity: Joi.number().min(1).required(),
      txId: Joi.string().required(),
      status: Joi.string().required(),
      productId: Joi.string().required(),
      amount: Joi.number().min(0).required(),
      storeId: Joi.string().required(),
    }),
  },
};
