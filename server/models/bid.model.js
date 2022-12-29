import { model, Schema } from "mongoose";
const date = new Date().toLocaleDateString();
const time = new Date().toLocaleTimeString();

const bidSchema = new Schema({
  clientId: { type: String, required: true },
  date: { type: String, default: date },
  time: { type: String, default: time },
  isApproved: { type: Boolean },
  data: { type: Array, required: true },
  comment: { type: String, default: "No comment" },
});

export const Bid = model("Bid", bidSchema);
