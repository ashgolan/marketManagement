import { Router } from "express";
import {
  findTransactionsByOwner,
  findTransactionsByDate,
  getAllTransactions,
  newTransaction,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transaction.controller.js";

export const transactionRouter = Router();

transactionRouter.post("/", newTransaction);
transactionRouter.get("/", getAllTransactions);
transactionRouter.get("/findByOwner", findTransactionsByOwner);
transactionRouter.get("/findByDate", findTransactionsByDate);
transactionRouter.get("/", findTransactionsByDate);
transactionRouter.patch("/", updateTransaction);
transactionRouter.delete("/", deleteTransaction);
// transactionRouter.get("/sum", getSum);
