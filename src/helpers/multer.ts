import multer from "multer";
import { Request } from "express";

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  callback: multer.FileFilterCallback
) => {
  const allowedFormats = ["image/png", "image/webp", "image/jpeg"];

  if (!allowedFormats.includes(file.mimetype)) {
    return callback(new Error("Only PNG, WebP, and JPG image files are allowed!"));
  }
  callback(null, true);
};

const upload = multer({
  limits: { fieldSize: 1024 * 1024 },
  fileFilter,
});

export default upload;
