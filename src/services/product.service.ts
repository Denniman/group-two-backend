import httpStatus from "http-status";
import { Product, ProductCategory } from "@prisma/client";
import ProductRepository from "../repository/product-repository";
import APIError from "../helpers/api_errors";

// All Business logic will be here
export default class ProductService {
  repository: any;

  constructor() {
    this.repository = new ProductRepository();
  }

  async createProduct(product: Product): Promise<Product> {
    try {
      const newProduct = await this.repository.createProduct(product);

      return newProduct;
    } catch (error) {
      throw new APIError({
        status: httpStatus.BAD_REQUEST,
        message: "Error creating product",
      });
    }
  }

  async getAllProducts(): Promise<Product[]> {
    try {
      const products = await this.repository.getAllProducts();
      return products;
    } catch (error) {
      throw new APIError({
        status: httpStatus.BAD_REQUEST,
        message: "Error getting products",
      });
    }
  }

  async getProductById(id: string): Promise<Product> {
    try {
      const product = await this.repository.getProductById(id);
      return product;
    } catch (error) {
      throw new APIError({
        status: httpStatus.BAD_REQUEST,
        message: "Error getting product",
      });
    }
  }

  async updateProduct(id: string, product: Product): Promise<Product> {
    try {
      const updatedProduct = await this.repository.updateProduct(id, product);
      return updatedProduct;
    } catch (error) {
      throw new APIError({
        status: httpStatus.BAD_REQUEST,
        message: "Error updating product",
      });
    }
  }

  async deleteProduct(id: string): Promise<Product> {
    try {
      const deletedProduct = await this.repository.deleteProduct(id);
      return deletedProduct;
    } catch (error) {
      throw new APIError({
        status: httpStatus.BAD_REQUEST,
        message: "Error deleting product",
      });
    }
  }

  async getProductByCategoryId(categoryId: string): Promise<Product[]> {
    try {
      const products = await this.repository.getProductByCategoryId(categoryId);
      return products;
    } catch (error) {
      throw new APIError({
        status: httpStatus.BAD_REQUEST,
        message: "Error getting products",
      });
    }
  }

  async createProductCategory(category: ProductCategory): Promise<ProductCategory> {
    try {
      const newCategory = await this.repository.createProductCategory(category);
      return newCategory;
    } catch (error) {
      throw new APIError({
        status: httpStatus.BAD_REQUEST,
        message: "Error creating product category",
      });
    }
  }

  async getAllProductCategories(): Promise<ProductCategory[]> {
    try {
      const categories = await this.repository.getAllProductCategories();
      console.log(categories);
      return categories;
    } catch (error) {
      throw new APIError({
        status: httpStatus.BAD_REQUEST,
        message: "Error getting product categories",
      });
    }
  }

  async updateProductCategory(id: string, category: ProductCategory): Promise<ProductCategory> {
    try {
      const updatedCategory = await this.repository.updateProductCategory(id, category);
      return updatedCategory;
    } catch (error) {
      throw new APIError({
        status: httpStatus.BAD_REQUEST,
        message: "Error updating product category",
      });
    }
  }

  async deleteProductCategory(id: string): Promise<ProductCategory> {
    try {
      const deletedCategory = await this.repository.deleteProductCategory(id);
      return deletedCategory;
    } catch (error) {
      throw new APIError({
        status: httpStatus.BAD_REQUEST,
        message: "Error deleting product category",
      });
    }
  }
}
