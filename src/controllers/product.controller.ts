import httpStatus from "http-status";
import { Request, Response, NextFunction } from "express";
import { ExpressResponseInterface } from "../../typings/helpers";
import ProductService from "../services/product.service";
import sendResponse from "../helpers/response";
import { ProductControllerInterface } from "../../typings/ProductControllerInterface";

const service = new ProductService();

export default class ProductController extends ProductControllerInterface {
  static async create(req: Request, res: Response, next: NextFunction): ExpressResponseInterface {
    try {
      const product = await service.createProduct(req.body);
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
  static async getAll(_req: Request, res: Response, next: NextFunction): ExpressResponseInterface {
    try {
      const products = await service.getAllProducts();
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
  static async getById(req: Request, res: Response, next: NextFunction): ExpressResponseInterface {
    try {
      const product = await service.getProductById(req.params.id);
      return res.status(httpStatus.OK).json(
        sendResponse({
          payload: product,
          message: "success",
          status: httpStatus.OK,
        })
      );
    } catch (error) {
      return next(error);
    }
  }
  static async update(req: Request, res: Response, next: NextFunction): ExpressResponseInterface {
    try {
      const product = await service.updateProduct(req.params.id, req.body);
      return res.status(httpStatus.OK).json(
        sendResponse({
          payload: product,
          message: "success",
          status: httpStatus.OK,
        })
      );
    } catch (error) {
      return next(error);
    }
  }
  static async delete(req: Request, res: Response, next: NextFunction): ExpressResponseInterface {
    try {
      const product = await service.deleteProduct(req.params.id);
      return res.status(httpStatus.OK).json(
        sendResponse({
          payload: product,
          message: "success",
          status: httpStatus.OK,
        })
      );
    } catch (error) {
      return next(error);
    }
  }
  static async getProductByCategoryId(
    req: Request,
    res: Response,
    next: NextFunction
  ): ExpressResponseInterface {
    try {
      const products = await service.getProductByCategoryId(req.params.id);
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

  static async createProductCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ): ExpressResponseInterface {
    try {
      const category = await service.createProductCategory(req.body);
      console.info(category);

      return res.status(httpStatus.CREATED).json(
        sendResponse({
          payload: category,
          message: "success",
          status: httpStatus.CREATED,
        })
      );
    } catch (error) {
      return next(error);
    }
  }

  static async getAllProductCategories(
    _req: Request,
    res: Response,
    next: NextFunction
  ): ExpressResponseInterface {
    try {
      const categories = await service.getAllProductCategories();
      console.log(categories);
      return res.status(httpStatus.OK).json(
        sendResponse({
          payload: categories,
          message: "success",
          status: httpStatus.OK,
        })
      );
    } catch (error) {
      return next(error);
    }
  }

  static async updateProductCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ): ExpressResponseInterface {
    try {
      const category = await service.updateProductCategory(req.params.id, req.body);
      return res.status(httpStatus.OK).json(
        sendResponse({
          payload: category,
          message: "success",
          status: httpStatus.OK,
        })
      );
    } catch (error) {
      return next(error);
    }
  }

  static async deleteProductCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ): ExpressResponseInterface {
    try {
      const category = await service.deleteProductCategory(req.params.id);
      return res.status(httpStatus.OK).json(
        sendResponse({
          payload: category,
          message: "success",
          status: httpStatus.OK,
        })
      );
    } catch (error) {
      return next(error);
    }
  }
}
