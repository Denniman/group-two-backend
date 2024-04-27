/* ************************************************************************************** *
 * ******************************                    ************************************ *
 * ******************************   APP AUTH ROUTES  ************************************ *
 * ******************************                    ************************************ *
 * ************************************************************************************** */

import { Router } from "express";
import { celebrate as validate } from "celebrate";
import MerchantController from "../controllers/merchant.controller";
import StoreValidation from "../validations/store.validation";
import BusinessValidation from "../validations/business.validation";

const router = Router();

router
  .route("/create-store")
  .post(
    [validate(StoreValidation.createStore, { abortEarly: false })],
    MerchantController.createStore
  );

router.route("/get-store").get(MerchantController.getStore);

//mount business routes
router
  .route("/create-business")
  .post(
    [validate(BusinessValidation.createBusiness, { abortEarly: false })],
    MerchantController.createBusiness
  );

router.route("/get-transactions/:id").get(MerchantController.getTransactions);

export default router;
