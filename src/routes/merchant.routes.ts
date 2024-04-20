/* ************************************************************************************** *
 * ******************************                    ************************************ *
 * ******************************   APP AUTH ROUTES  ************************************ *
 * ******************************                    ************************************ *
 * ************************************************************************************** */

import { Router } from "express";
import { celebrate as validate } from "celebrate";

import MerchantController from "../controllers/merchant.controller";
import StoreValidation from "../validations/store.validation";

const router = Router();

router
  .route("/create-store")
  .post(
    [validate(StoreValidation.createStore, { abortEarly: false })],
    MerchantController.createStore
  );

export default router;
