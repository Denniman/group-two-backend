/* ************************************************************************************** *
 * ******************************                    ************************************ *
 * ******************************   APP AUTH ROUTES  ************************************ *
 * ******************************                    ************************************ *
 * ************************************************************************************** */

import { Router } from "express";
import { celebrate as validate } from "celebrate";

import AuthController from "../controllers/auth.controller";
import AuthValidation from "../validations/auth.validation";

const router = Router();

router
  .route("/signup")
  .post([validate(AuthValidation.signupUser, { abortEarly: false })], AuthController.signup);

router
  .route("/signin")
  .post([validate(AuthValidation.login, { abortEarly: false })], AuthController.signin);

export default router;
