import { model, Schema } from "mongoose";
const date = new Date().toLocaleDateString();
const time = new Date().toLocaleTimeString();
const transactionsSchema = new Schema({
  date: { type: String, default: date },
  time: { type: String, default: time },
  type: {
    type: String,
    required: true,
    default: "buying",
    validate(value) {
      if (value !== "payment" && value !== "buying")
        throw Error("inserted type is no allowed!!");
    },
  },
  owner: { type: String, required: true },
  data: { type: Array, required: true },
  totalAmount: {
    type: Number,
  },
  comment: { type: String, default: "No comment" },
});

transactionsSchema.pre("save", function (next) {
  const transaction = this;
  console.log("before saving..");
  if (transaction.type === "buying") {
    let count = 0;
    transaction.data.forEach((element) => {
      count += element.totalAmount;
    });
    transaction.totalAmount = count;
  }
  next();
});

export const Transaction = model("Transaction", transactionsSchema);
