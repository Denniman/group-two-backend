import prisma from "../config/prisma";
import httpStatus from "http-status";
import APIError from "../helpers/api_errors";
import BcryptService from "../services/bcrypt.service";
import { HttpExceptionInterface } from "typings/helpers";
import { AuthValidationInterface } from "typings/authValdiation";
import { generateSessionToken } from "../services/generateSessionToken.service";

export default class MerchantModel {
  static async signup(request_obj: AuthValidationInterface) {
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

      const user = await prisma.merchant.create({
        data: { ...request_obj, password: hashedPassword },
      });

      return user;
    } catch (error) {
      throw new APIError(error as HttpExceptionInterface);
    }
  }

  static async login(request_obj: AuthValidationInterface) {
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

      return session;
    } catch (error) {
      throw new APIError(error as HttpExceptionInterface);
    }
  }
}
