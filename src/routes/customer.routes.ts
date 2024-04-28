/* ************************************************************************************** *
 * ******************************                    ************************************ *
 * ******************************   APP AUTH ROUTES  ************************************ *
 * ******************************                    ************************************ *
 * ************************************************************************************** */

import { Router } from "express";
import { celebrate as validate } from "celebrate";
import TransactionValidation from "../validations/transaction.validation";
import StoreValidation from "../validations/store.validation";
import CustomerController from "../controllers/customer.controller";

const router = Router();

router
  .route("/create-transaction")
  .post(
    [validate(TransactionValidation.createTransaction, { abortEarly: false })],
    CustomerController.createTransaction
  );
  .route("/get-store")
  .post([validate(StoreValidation.getStore, { abortEarly: false })], CustomerController.getStore);

export default router;
