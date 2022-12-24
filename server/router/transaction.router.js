import { Router } from "express";
import {
  findTransactionsByOwner,
  findTransactionsByDate,
  getAllTransactions,
  newTransaction,
} from "../controllers/transaction.controller.js";

export const transactionRouter = Router();

transactionRouter.post("/", newTransaction);
transactionRouter.get("/", getAllTransactions);
transactionRouter.get("/findByOwner", findTransactionsByOwner);
transactionRouter.get("/findByDate", findTransactionsByDate);
