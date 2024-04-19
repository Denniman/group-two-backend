// transactionRoutes.ts
import { Router } from "express";
import { TransactionController } from "../controllers/transaction.controller";

const router = Router();

router.get("/transactions", TransactionController.getAllTransactions);

router.post("/transactions", TransactionController.createTransaction);

router.get("/transaction/:txid", TransactionController.getTransactionById);

router.put("/transaction/:txid", TransactionController.updateTransaction);

router.delete("/transaction/:txid", TransactionController.deleteTransaction);

router.get("/transactions/customer/:customerId", TransactionController.getTransactionsByCustomerId);

router.get("/transactions/date/:year/:month/:day", TransactionController.getTransactionsByDate);

router.get("/transactions/product/:productId", TransactionController.getTransactionsByProductId);

router.get("/transactions/batch/:batchNumber", TransactionController.getTransactionsByBatchNumber);

export default router;
