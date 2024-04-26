export interface ProductsInterface {
  id: string;
  productName: string;
  batchNumber: string;
  storeId: string;
  productImage: string;
  quantity: number;
  amount: number;
  description: string;
  categoryName: string;
}

export interface ProductsRequestInterface extends ProductsInterface {
  id: string;
  email: string;
  categoryName: string;
}
