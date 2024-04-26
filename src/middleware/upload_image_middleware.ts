import { Request, Response, NextFunction } from "express";
import Imagekit from "../services/imagekit.service";

/**
 * Function for uploading images to imagekit
 * @function uploadImage
 * @description Upload any image to the imagekit server
 * @param {Request} req - HTTP Request object
 * @param {Response} _res - HTTP Response object
 * @param {NextFunction} next - HTTP NextFunction function
 * @returns {Promise<void>} {Promise<void>}
 */

export default async function uploadImage(
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { productImage, productName } = req.body;

    const imageUrl = await Imagekit.upload({
      file: productImage,
      fileName: productName,
    });

    req.uploadedImageFile = imageUrl.url;
    return next();
  } catch (error) {
    next(error);
  }
}
