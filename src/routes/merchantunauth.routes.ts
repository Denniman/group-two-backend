/* ************************************************************************************** *
 * ******************************                    ************************************ *
 * ******************************   MERCHANT ANONYMOUS ROUTES  ************************************ *
 * ******************************                    ************************************ *
 * ************************************************************************************** */

import { Router } from "express";
import MerchantController from "../controllers/merchant.controller";
const router = Router();

router.route("/get-transactions/:id").get(MerchantController.getTransactions);

export default router;
