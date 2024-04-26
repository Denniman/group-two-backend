import { Request } from "express";
import { User, Token } from "../user";
import { FormImageType } from "typings/image";
import { PaginateFunction } from "prisma-pagination";

declare global {
  export namespace Express {
    interface Request {
      token: MerchantTokenType;
      uploadedImageFile: string;
      file?: { [key: string]: FormImageType };
      paginate: PaginateFunction;
    }
  }
}
