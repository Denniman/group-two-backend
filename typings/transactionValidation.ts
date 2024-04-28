import { TransactionStatus } from "@prisma/client";

export interface TransactionValidation {
  date: Date;
  quantity: number;
  txId: string;
  productId: string;
  status: TransactionStatus | null | undefined;
  amount: number;
  storeId: string;
}
