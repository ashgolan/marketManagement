import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/inventory.controller.js";

export const inventoryRouter = Router();

inventoryRouter.post("/", addProduct);
inventoryRouter.get("/", getProducts);
inventoryRouter.patch("/", updateProduct);
inventoryRouter.delete("/", deleteProduct);
