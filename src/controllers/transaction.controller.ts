// TransactionController.ts
import prisma from "../config/prisma";
import { Request, Response } from "express";

export class TransactionController {
  // Method to get all transactions
  public static async getAllTransactions(_req: Request, res: Response): Promise<void> {
    try {
      const transactions = await prisma.transaction.findMany();
      res.status(200).json(transactions);
    } catch (error) {
      res.status(500).json({ error: "Error fetching transactions" });
    }
  }

  // Method to create a new transaction
  public static async createTransaction(req: Request, res: Response): Promise<void> {
    try {
      const transaction = await prisma.transaction.create({
        data: req.body,
      });
      res.status(201).json(transaction);
    } catch (error) {
      res.status(500).json({ error: "Error creating transaction" });
    }
  }

  // Method to get a single transaction by txid
  public static async getTransactionById(req: Request, res: Response): Promise<void> {
    try {
      const txId = req.params.txid;
      const transaction = await prisma.transaction.findUnique({
        where: { id: txId },
      });
      if (transaction) {
        res.status(200).json(transaction);
      } else {
        res.status(404).json({ error: "Transaction not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching transaction" });
    }
  }

  // Method to update a transaction by txid
  public static async updateTransaction(req: Request, res: Response): Promise<void> {
    try {
      const txId = req.params.txid;
      const transaction = await prisma.transaction.update({
        where: { id: txId },
        data: req.body,
      });
      res.status(200).json(transaction);
    } catch (error) {
      res.status(500).json({ error: "Error updating transaction" });
    }
  }

  // Method to delete a transaction by txid
  public static async deleteTransaction(req: Request, res: Response): Promise<void> {
    try {
      const txId = req.params.txid;
      await prisma.transaction.delete({
        where: { id: txId },
      });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Error deleting transaction" });
    }
  }

  // Method to get transactions by customerId
  public static async getTransactionsByCustomerId(req: Request, res: Response): Promise<void> {
    try {
      const customerId = parseInt(req.params.customerId);
      const transactions = await prisma.transaction.findMany({
        where: {
          customerId: customerId.toString(), // Now 'customerId' is a recognized field and the correct type
        },
      });
      res.status(200).json(transactions);
    } catch (error) {
      res.status(500).json({ error: "Error fetching transactions by customer ID" });
    }
  }

  // Method to get transactions by date (year, month, day)
  public static async getTransactionsByDate(req: Request, res: Response): Promise<void> {
    try {
      const year = parseInt(req.params.year);
      const month = parseInt(req.params.month) - 1; // JavaScript Date object months are 0-indexed
      const day = parseInt(req.params.day);
      const startDate = new Date(year, month, day);
      const endDate = new Date(year, month, day + 1);

      const transactions = await prisma.transaction.findMany({
        where: {
          date: {
            gte: startDate,
            lt: endDate,
          },
        },
      });
      res.status(200).json(transactions);
    } catch (error) {
      res.status(500).json({ error: "Error fetching transactions by date" });
    }
  }

  // Method to get transactions by productId
  public static async getTransactionsByProductId(req: Request, res: Response): Promise<void> {
    try {
      const productId = req.params.productId; // Keep it as a string
      const transactions = await prisma.transaction.findMany({
        where: { productId },
      });
      res.status(200).json(transactions);
    } catch (error) {
      res.status(500).json({ error: "Error fetching transactions by product ID" });
    }
  }

  // Method to get transactions by batchNumber
  // Method to get transactions by batchNumber
  public static async getTransactionsByBatchNumber(req: Request, res: Response): Promise<void> {
    try {
      // Parse batchNumber as an integer
      const batchNumber = parseInt(req.params.batchNumber);
      if (isNaN(batchNumber)) {
        res.status(400).json({ error: "Invalid batch number" });
        return;
      }

      const transactions = await prisma.transaction.findMany({
        where: { batchNumber },
      });
      res.status(200).json(transactions);
    } catch (error) {
      res.status(500).json({ error: "Error fetching transactions by batch number" });
    }
  }
}
