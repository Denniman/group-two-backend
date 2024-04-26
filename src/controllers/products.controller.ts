import httpStatus from "http-status";
import { Request, Response, NextFunction } from "express";

import sendResponse from "../helpers/response";
import ProductsModel from "../Models/products.model";
import { UserControllerInterface } from "../../typings/merchant";
import { ExpressResponseInterface } from "../../typings/helpers";

/**
 *
 * @class
 * @extends ProductsController
 * @classdesc Class representing the authentication controller
 * @description App authentication controller
 * @name AuthController
 *
 */

export default class ProductsController extends UserControllerInterface {
  static async createProducts(
    req: Request,
    res: Response,
    next: NextFunction
  ): ExpressResponseInterface {
    try {
      const productImage = req.uploadedImageFile;

      const { aud: id } = req.token;

      const product = await ProductsModel.createProducts({ ...req.body, id, productImage });

      return res.status(httpStatus.CREATED).json(
        sendResponse({
          payload: product,
          message: "success",
          status: httpStatus.CREATED,
        })
      );
    } catch (error) {
      return next(error);
    }
  }

  static async getAllProducts(
    req: Request,
    res: Response,
    next: NextFunction
  ): ExpressResponseInterface {
    try {
      const { aud: id } = req.token;

      const products = await ProductsModel.getAllProducts(id);

      return res.status(httpStatus.OK).json(
        sendResponse({
          payload: products,
          message: "success",
          status: httpStatus.OK,
        })
      );
    } catch (error) {
      return next(error);
    }
  }
}
