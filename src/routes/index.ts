/* ************************************************************************************** *
 * ******************************                    ************************************ *
 * ******************************   ALL APP ROUTES   ************************************ *
 * ******************************                    ************************************ *
 * ************************************************************************************** */

import { Request, Response, Router } from "express";
import authRoute from "./auth.routes";
import productRoute from "./product.routes";

const router = Router();

/** GET /health-check - Check service health */
router.get("/health-check", (_req: Request, res: Response) =>
  res.send({ check: "switchCommerce server started ok*-*" })
);

// mount auth routes
router.use("/auth", authRoute);

// mount product routes
router.use("/products", productRoute);

export default router;
