import { Request, Response, NextFunction } from "express";
import { ExpressResponseInterface } from "./helpers";

export abstract class ProductControllerInterface {
  public static getAll: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => ExpressResponseInterface;

  public static getById: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => ExpressResponseInterface;

  public static update: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => ExpressResponseInterface;

  public static delete: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => ExpressResponseInterface;

  public static getProductByCategoryId: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => ExpressResponseInterface;

  public static createProductCategory: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => ExpressResponseInterface;

  public static getAllProductCategories: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => ExpressResponseInterface;

  public static updateProductCategory: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => ExpressResponseInterface;

  public static deleteProductCategory: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => ExpressResponseInterface;
}
