/* ************************************************************************************** *
 * ******************************                    ************************************ *
 * ******************************   CUSTOMER ROUTES  ************************************ *
 * ******************************                    ************************************ *
 * ************************************************************************************** */

import { Router } from "express";
import { celebrate as validate } from "celebrate";
import CustomerController from "../controllers/customer.controller";
import TransactionValidation from "../validations/transaction.validation";

const router = Router();

router
  .route("/create-transaction")
  .post(
    [validate(TransactionValidation.createTransaction, { abortEarly: false })],
    CustomerController.createTransaction
  );

export default router;
