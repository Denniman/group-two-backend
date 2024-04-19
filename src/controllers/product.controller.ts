import httpStatus from "http-status";
import { Request, Response, NextFunction } from "express";
import prisma from "../config/prisma";
import { ExpressResponseInterface } from "../../typings/helpers";
import APIError from "../helpers/api_errors";
import ProductModel from "../model/product-model";
import sendResponse from "../helpers/response";
import { ProductControllerInterface } from "../../typings/ProductControllerInterface";

const service = new ProductModel();

export default class ProductController extends ProductControllerInterface {
  static async create(req: Request, res: Response, next: NextFunction): ExpressResponseInterface {
    try {
      const product = await prisma.product.create({
        data: req.body,
      });

      if (!product) {
        throw new APIError({
          status: httpStatus.BAD_REQUEST,
          message: "Unable to Create Product",
        });
      }

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
      const products = await prisma.product.findMany();

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

      if (!product) {
        throw new APIError({
          status: httpStatus.NOT_FOUND,
          message: "Product not found",
        });
      }

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

      if (!product) {
        throw new APIError({
          status: httpStatus.BAD_REQUEST,
          message: "Product not updated",
        });
      }

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

      if (!product) {
        throw new APIError({
          status: httpStatus.BAD_REQUEST,
          message: "Product not Deleted",
        });
      }

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
      if (!category) {
        throw new APIError({
          status: httpStatus.BAD_REQUEST,
          message: "Product category not created",
        });
      }

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
      const categories = await prisma.productCategory.findMany();

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

      if (!category) {
        throw new APIError({
          status: httpStatus.BAD_REQUEST,
          message: "Product category not updated",
        });
      }

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

      if (!category) {
        throw new APIError({
          status: httpStatus.BAD_REQUEST,
          message: "Product category not deleted",
        });
      }

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
