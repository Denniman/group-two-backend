/* ************************************************************************************** *
 * ******************************                    ************************************ *
 * ******************************   APP AUTH ROUTES  ************************************ *
 * ******************************                    ************************************ *
 * ************************************************************************************** */

import { Router } from "express";
import { celebrate as validate } from "celebrate";
import StoreValidation from "../validations/store.validation";
import CustomerController from "../controllers/customer.controller";

const router = Router();

router
  .route("/get-store")
  .post([validate(StoreValidation.getStore, { abortEarly: false })], CustomerController.getStore);

export default router;
