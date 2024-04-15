import { Request } from "express";
import { PaginateFunction } from "prisma-pagination";
import { User, Token } from "../user";
import { FormImageType } from "typings/image";

declare global {
    export namespace Express {
        interface Request {
            token: UserTokenType;
            uploadedImageFile?: string;
            file?: { [key: string]: FormImageType };
            paginate: PaginateFunction;
        }
    }
}
