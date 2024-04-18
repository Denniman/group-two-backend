/* ************************************************************************************** *
 * ******************************                    ************************************ *
 * ******************************   APP AUTH ROUTES  ************************************ *
 * ******************************                    ************************************ *
 * ************************************************************************************** */

import { Router } from "express";
import { celebrate as validate } from "celebrate";

import ProductController from "../controllers/product.controller";

// import ProductController from "src/controllers/product.controller";

const router = Router();

router
  .route("/")
  .get(ProductController.getAll)
  .post(validate({ body: ProductController.create }), ProductController.create);

router
  .route("/:id")
  .get(ProductController.getById)
  .put(validate({ body: ProductController.update }), ProductController.update)
  .delete(ProductController.delete);

router.route("/category/:id").get(ProductController.getProductByCategoryId);

router
  .route("/categories")
  .get(ProductController.getAllProductCategories)
  .post(
    validate({ body: ProductController.createProductCategory }),
    ProductController.createProductCategory
  );

router
  .route("/category/:id")
  .put(
    validate({ body: ProductController.updateProductCategory }),
    ProductController.updateProductCategory
  )
  .delete(ProductController.deleteProductCategory);

export default router;
