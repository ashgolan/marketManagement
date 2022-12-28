import { model, Schema } from "mongoose";
const inventorySchema = new Schema({
  productName: { type: String, required: true },
  serial: { type: String, default: "000000" },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  price: { type: Number, required: true },
  comment: { type: String , default : 'No comment' },
});

export const Inventory = model("Inventory", inventorySchema);
