export interface Products {
  productName: string;
  batchNumber: string;
  productImage: string;
  description: string;
  quantity: number;
  amount: number;
}

export interface ProductsRequestInterface extends Products {
  id: string;
  email: string;
  categoryName: string;
}
