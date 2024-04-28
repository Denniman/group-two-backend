import prisma from "../config/prisma";
import httpStatus from "http-status";
import APIError from "../helpers/api_errors";
import BcryptService from "../services/bcrypt.service";
import { HttpExceptionInterface } from "typings/helpers";
import { CustomerValidation } from "typings/customerValidation";
import { TransactionValidation } from "typings/transactionValidation";

export default class CustomerModel {
  static async create(request_obj: CustomerValidation): Promise<any> {
    try {
      const { email, password, storeName } = request_obj;

      const userExits = await prisma.customer.findUnique({
        where: {
          email,
        },
      });

      if (userExits) {
        throw new APIError({
          status: httpStatus.BAD_REQUEST,
          message: "Account already exist, please login to continue",
        });
      }

      const store = await prisma.store.findUnique({
        where: {
          storeName,
        },
      });

      if (!store) {
        throw new APIError({
          status: httpStatus.NOT_FOUND,
          message: "Store does not exist",
        });
      }

      const hashedPassword = await BcryptService.hashPassword(password);

      const customer = await prisma.customer.create({
        data: { ...request_obj, storeId: store?.id, password: hashedPassword },
      });

      return customer;
    } catch (error) {
      throw new APIError(error as HttpExceptionInterface);
    }
  }

  static async create_transaction(request_obj: TransactionValidation) {
    try {
      const { quantity, txId, productId, status, amount, storeId } = request_obj;

      const transaction = await prisma.transaction.create({
        data: { quantity, txId, productId, status, amount, storeId },
      });

      if (!transaction) {
        throw new APIError({
          status: httpStatus.BAD_REQUEST,
          message: "Transaction creation failed",
        });
      }

      return transaction;
    } catch (error) {
    throw new APIError(error as HttpExceptionInterface);
  }
}
      
      
  static async getMerchantStore(storeName: string): Promise<any> {
    try {
      const storeProducts = await prisma.store.findUnique({
        where: {
          storeName,
        },
        include: {
          products: {
            include: {
              category: true,
            },
          },
          setting: true,
        },
      });

      if (!storeProducts) {
        throw new APIError({
          status: httpStatus.NOT_FOUND,
          message: "Store does not exist.",
        });
      }

      return storeProducts;
    } catch (error) {
      throw new APIError(error as HttpExceptionInterface);
    }
  }
}
