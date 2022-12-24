import { model, Schema } from "mongoose";
const date = new Date().toLocaleDateString();
const time = new Date().toLocaleTimeString();
const transactionsSchema = new Schema({
  date: { type: String, default: date },
  time: { type: String, default: time },
  owner: { type: String, required: true },
  data: { type: Object, required: true },
  comment: { type: String, default: "No comment" },
});

export const Transaction = model("Transaction", transactionsSchema);
