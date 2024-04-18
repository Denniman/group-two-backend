import httpStatus from "http-status";
import { Product, ProductCategory } from "@prisma/client";
import prisma from "../config/prisma";
import APIError from "../helpers/api_errors";

export default class ProductRepository {
  async createProduct(product: Product): Promise<Product> {
    try {
      const newProduct = await prisma.product.create({
        data: product,
      });
      return newProduct;
    } catch (err) {
      throw new APIError({
        status: httpStatus.BAD_REQUEST,
        message: "Unable to Create Product",
      });
    }
  }

  async getAllProducts(): Promise<Product[]> {
    try {
      const products = await prisma.product.findMany();

      return products;
    } catch (err) {
      throw new APIError({
        status: httpStatus.BAD_REQUEST,
        message: "Unable to Get Products",
      });
    }
  }

  async getProductById(id: string): Promise<Product | any> {
    try {
      const product = await prisma.product.findUnique({
        where: {
          id: id,
        },
      });
      return product;
    } catch (err) {
      throw new APIError({
        status: httpStatus.BAD_REQUEST,
        message: "Unable to Get Product",
      });
    }
  }

  async getProductByCategoryId(id: string): Promise<Product | any> {
    try {
      const product = await prisma.product.findMany({
        where: {
          categoryId: id,
        },
      });
      return product;
    } catch (err) {
      throw new APIError({
        status: httpStatus.BAD_REQUEST,
        message: "Unable to Get Product",
      });
    }
  }

  async updateProduct(id: string, product: Product): Promise<Product | any> {
    try {
      const updatedProduct = await prisma.product.update({
        where: {
          id: id,
        },
        data: product,
      });
      return updatedProduct;
    } catch (err) {
      throw new APIError({
        status: httpStatus.BAD_REQUEST,
        message: "Unable to Update Product",
      });
    }
  }

  async deleteProduct(id: string): Promise<Product | any> {
    try {
      const deletedProduct = await prisma.product.delete({
        where: {
          id: id,
        },
      });
      return deletedProduct;
    } catch (err) {
      throw new APIError({
        status: httpStatus.BAD_REQUEST,
        message: "Unable to Delete Product",
      });
    }
  }

  async getAllProductCategories(): Promise<ProductCategory[]> {
    try {
      const productcategories = await prisma.productCategory.findMany();
      console.log(productcategories);
      return productcategories;
    } catch (err) {
      throw new APIError({
        status: httpStatus.BAD_REQUEST,
        message: "Unable to Get Product Categories",
      });
    }
  }

  async createProductCategory(category: ProductCategory): Promise<ProductCategory> {
    try {
      const newCategory = await prisma.productCategory.create({
        data: category,
      });
      return newCategory;
    } catch (err) {
      throw new APIError({
        status: httpStatus.BAD_REQUEST,
        message: "Unable to Create Product Category",
      });
    }
  }

  async updateProductCategory(
    id: string,
    category: ProductCategory
  ): Promise<ProductCategory | any> {
    try {
      const updatedProduct = await prisma.productCategory.update({
        where: {
          id: id,
        },
        data: category,
      });
      return updatedProduct;
    } catch (err) {
      throw new APIError({
        status: httpStatus.BAD_REQUEST,
        message: "Unable to Update Product Category",
      });
    }
  }

  async deleteProductCategory(id: string): Promise<ProductCategory | any> {
    try {
      const deletedProduct = await prisma.productCategory.delete({
        where: {
          id: id,
        },
      });
      return deletedProduct;
    } catch (err) {
      throw new APIError({
        status: httpStatus.BAD_REQUEST,
        message: "Unable to Delete Product Category",
      });
    }
  }
}
