import prisma from "../config/prisma";
import httpStatus from "http-status";
import { ProductsInterface } from "../../typings/products";
import APIError from "../helpers/api_errors";
import { HttpExceptionInterface } from "typings/helpers";

export default class ProductsModel {
  static async createProducts(request_obj: ProductsInterface) {
    try {
      const { categoryName, productImage, id, ...rest } = request_obj;

      const merchant = await prisma.merchant.findUnique({
        where: {
          id,
        },
      });

      if (!merchant?.storeId) {
        throw new APIError({
          status: httpStatus.BAD_REQUEST,
          message: "You must create a store to continue this operation.",
        });
      }

      const product = await prisma.$transaction(async (prisma) => {
        const productCategory = await prisma.productCategory.create({ data: { categoryName } });

        await prisma.product.create({
          data: {
            ...rest,
            productImage,
            storeId: String(merchant.storeId),
            categoryId: productCategory.id,
          },
        });

        const storeProducts = await prisma.store.findUnique({
          where: {
            id: String(merchant.storeId),
          },
          include: {
            products: true,
          },
        });

        return storeProducts;
      });

      return product;
    } catch (error) {
      throw new APIError(error as HttpExceptionInterface);
    }
  }

  static async getAllProducts(id: string) {
    try {
      const merchant = await prisma.merchant.findUnique({
        where: {
          id,
        },
      });

      if (!merchant?.storeId) {
        throw new APIError({
          status: httpStatus.NOT_FOUND,
          message: "Merchant does not have a store.",
        });
      }

      const store = await prisma.store.findUnique({
        where: {
          id: merchant.storeId,
        },
        include: {
          products: true,
        },
      });

      return store;
    } catch (error) {
      throw new APIError(error as HttpExceptionInterface);
    }
  }
}
