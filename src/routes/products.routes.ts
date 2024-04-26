/* ************************************************************************************** *
 * ******************************                    ************************************ *
 * ******************************   APP AUTH ROUTES  ************************************ *
 * ******************************                    ************************************ *
 * ************************************************************************************** */

import { Router } from "express";
import { celebrate as validate } from "celebrate";
import uploadImage from "../middleware/upload_image_middleware";
import ProductsController from "../controllers/products.controller";
import ProductsValidation from "../validations/product.validation";

const router = Router();

router
  .route("/create-product")
  .post(
    [validate(ProductsValidation.createProduct, { abortEarly: false })],
    uploadImage,
    ProductsController.createProducts
  );

router.route("/get-products").get(ProductsController.getAllProducts);

export default router;
