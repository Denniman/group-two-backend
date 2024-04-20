import prisma from "../config/prisma";
import httpStatus from "http-status";
import APIError from "../helpers/api_errors";
import BcryptService from "../services/bcrypt.service";
import { HttpExceptionInterface } from "typings/helpers";
import { AuthValidationInterface } from "typings/authValdiation";
import { StoreInterface, StoreModelInterface } from "typings/storeValidation";
import { MerchantInterface } from "typings/merchant";
import { SessionInterface } from "typings/merchant";
import { generateSessionToken } from "../services/generateSessionToken.service";
import { BusinessModelInterface, BusinessInterface } from "typings/businessValidation";


/**
 * Class representing a Merchant Model for handling authentication and store management.
 */
export default class MerchantModel {
  /**
   * Signup method for registering a new merchant account.
   * @param {AuthValidationInterface} request_obj - The request object containing email and password for signup.
   * @returns {Promise<MerchantInterface>} - A promise resolving to the created user Session.
   * @throws {APIError} - Throws an error if account already exists or on any other API-related errors.
   */
  static async signup(request_obj: AuthValidationInterface): Promise<MerchantInterface | null> {
    try {
      const { email, password } = request_obj;

      const userExits = await prisma.merchant.findUnique({
        where: {
          email,
        },
      });

      if (userExits) {
        throw new APIError({
          status: httpStatus.BAD_REQUEST,
          message: "Account already registered with us",
        });
      }

      const hashedPassword = await BcryptService.hashPassword(password);

      const merchant = await prisma.merchant.create({
        data: { ...request_obj, password: hashedPassword },
      });

      return merchant;
    } catch (error) {
      throw new APIError(error as HttpExceptionInterface);
    }
  }

  /**
   * Login method for authenticating a merchant.
   * @param {AuthValidationInterface} request_obj - The request object containing email and password for login.
   * @returns {Promise<SessionInterface>} - A promise resolving to the session object with tokens.
   * @throws {APIError} - Throws an error if user does not exist, password is invalid, or on any other API-related errors.
   */

  static async login(request_obj: AuthValidationInterface): Promise<SessionInterface | null> {
    try {
      const { email, password } = request_obj;

      const user = await prisma.merchant.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        throw new APIError({
          status: httpStatus.BAD_REQUEST,
          message: "User does not exist",
        });
      }

      const userPassword = BcryptService.comparePassword(password, user.password);

      if (!userPassword) {
        throw new APIError({
          status: httpStatus.BAD_REQUEST,
          message: "Invalid email or password",
        });
      }
      const session = await generateSessionToken(user);

      await prisma.session.create({
        data: {
          userId: user.id,
          refreshToken: session.refreshToken,
        },
      });

      return session;
    } catch (error) {
      throw new APIError(error as HttpExceptionInterface);
    }
  }

  /**
   * Method for creating a new store associated with a merchant.
   * @param {StoreModelInterface} request_obj - The request object containing store details.
   * @returns {Promise<StoreInterface>} - A promise resolving to the created store object.
   * @throws {APIError} - Throws an error on any API-related errors.
   */

  static async createStore(request_obj: StoreModelInterface): Promise<StoreInterface | null> {
    try {
      const { id, storeName, storeDescription, ...rest } = request_obj;

      const createStore = await prisma.$transaction(async (prisma) => {
        const storeSettings = await prisma.storeSetting.create({
          data: { ...rest },
        });
        const createMerchantStore = await prisma.store.create({
          data: { storeName, storeDescription, storeSettingsId: storeSettings.id },
        });

        await prisma.merchant.update({
          where: { id },
          data: {
            isSuperAdmin: true,
            storeId: createMerchantStore.id,
          },
        });

        return createMerchantStore;
      });

      return createStore;
    } catch (error) {
      throw new APIError(error as HttpExceptionInterface);
    }
  }

  static async createBusiness(request_obj: BusinessModelInterface): Promise<BusinessInterface | null> {
    try {
      const { id, businessName } = request_obj;

      const businessNameExits = await prisma.business.findUnique({
        where: {
          businessName,
        },
      });

      if (businessNameExits) {
        throw new APIError({
          status: httpStatus.BAD_REQUEST,
          message: "Business already registered with us",
        });
      }

      const registeredBusiness  = await prisma.business.create({
        data: { ...request_obj },
      });

      await prisma.merchant.update({
        where: { id },
        data: { businessId: registeredBusiness.id }

      });

      return registeredBusiness
    
    } catch (error) {
      throw new APIError(error as HttpExceptionInterface);
    }
  }

}
