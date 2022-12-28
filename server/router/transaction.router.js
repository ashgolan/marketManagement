import { Router } from "express";
import {
  findTransactionsByOwner,
  findTransactionsByDate,
  getAllTransactions,
  newTransaction,
  updateTransaction,
} from "../controllers/transaction.controller.js";

export const transactionRouter = Router();

transactionRouter.post("/", newTransaction);
transactionRouter.get("/", getAllTransactions);
transactionRouter.get("/findByOwner", findTransactionsByOwner);
transactionRouter.get("/findByDate", findTransactionsByDate);
transactionRouter.get("/", findTransactionsByDate);
transactionRouter.patch("/", updateTransaction);
// transactionRouter.get("/sum", getSum);
