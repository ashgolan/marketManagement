import { Inventory } from "../models/inventory.model.js";

export const addProduct = async (req, res) => {
  try {
    const inventory = await Inventory.create(req.body);
    if (!inventory) throw Error("bad requist data !!");
    res.status(200).send(inventory);
  } catch (e) {
    res.status(404).send(e.message);
  }
};
export const getProducts = async (req, res) => {
  try {
    const inventoryProducts = await Inventory.find();
    if (!inventoryProducts) throw Error("bad requist data !!");
    res.status(200).send(inventoryProducts);
  } catch (e) {
    res.status(404).send(e.message);
  }
};
// ????
export const updateProduct = async (req, res) => {
  try {
    const product = await Inventory.findByIdAndUpdate(
      { _id: req.body._id },
      { $set: req.body }
    );
    if (!product) throw Error("bad requist data !!");
    res.status(200).send(product);
  } catch (e) {
    res.status(404).send(e.message);
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const product = await Inventory.findByIdAndRemove({ _id: req.body._id });
    if (!product) throw Error("bad requist data !!");
    res.status(200).send(product);
  } catch (e) {
    res.status(404).send(e.message);
  }
};
