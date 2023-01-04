import { model, Schema } from "mongoose";
const inventorySchema = new Schema({
  productName: { type: String, required: true },
  serial: { type: String, default: "000000" },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  price: { type: Number, required: true },
  profit: { type: Number, default: 0 },
  tax: { type: Number, default: 0.17 },
  finalPrice: { type: Number },
  comment: { type: String, default: "No comment" },
});
inventorySchema.pre("save", function (next) {
  const product = this;
  const totalBeforeTax = product.price + product.price * product.profit;
  const totalPrice = totalBeforeTax + totalBeforeTax * product.tax;
  product.finalPrice = totalPrice;
  next();
});
export const Inventory = model("Inventory", inventorySchema);
