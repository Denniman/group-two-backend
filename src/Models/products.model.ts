import prisma from "../config/prisma";
import httpStatus from "http-status";
import { Product } from "@prisma/client";
import APIError from "../helpers/api_errors";
import { HttpExceptionInterface } from "typings/helpers";
import { ProductsInterface } from "../../typings/products";

export default class ProductsModel {
  static async createProducts(
    request_obj: ProductsInterface
  ): Promise<{ products: Product[] } | null> {
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

  static async getAllProducts(id: string): Promise<{ products: Product[] } | null> {
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

      const storeProducts = await prisma.store.findUnique({
        where: {
          id: merchant.storeId,
        },
        include: {
          products: {
            include: {
              category: true,
            },
          },
        },
      });

      return storeProducts;
    } catch (error) {
      throw new APIError(error as HttpExceptionInterface);
    }
  }
}
