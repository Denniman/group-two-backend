import { TransactionStatus } from "@prisma/client";

export interface TransactionValidation {
  quantity: number;
  txId: string;
  productId: string;
  status: TransactionStatus | null | undefined;
  amount: number;
  storeId: string;
}
