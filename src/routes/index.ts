/* ************************************************************************************** *
 * ******************************                    ************************************ *
 * ******************************   ALL APP ROUTES   ************************************ *
 * ******************************                    ************************************ *
 * ************************************************************************************** */

import { Request, Response, Router } from "express";
import authRoute from "./auth.routes";
import merchantRoute from "./merchant.routes";
import customerRoute from "./customer.routes";
import productsRoute from "./products.routes";
import AuthPolicy from "../policies/auth.policy";

const router = Router();

/** GET /health-check - Check service health */
router.get("/health-check", (_req: Request, res: Response) =>
  res.send({ check: "switchCommerce server started ok*-*" })
);

// mount auth routes
router.use("/auth", authRoute);

router.use("/customer", customerRoute);

/**
 * Check user access_token and authenticate user to perform HTTP requests
 * @description Validate the request, check if user is signed in and is authorized to perform this request
 */
router.use(AuthPolicy.hasAccessToken);

router.use("/merchant", merchantRoute);

router.use("/merchant", productsRoute);

export default router;
