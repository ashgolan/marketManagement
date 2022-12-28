import { Router } from "express";
import {
  addClient,
  deleteClient,
  getClientById,
  getClients,
  updateClient,
} from "../controllers/client.controller.js";
export const clientRouter = Router();

clientRouter.post("/", addClient);
clientRouter.get("/", getClients);
clientRouter.get("/findClient", getClientById);
clientRouter.patch("/", updateClient);
clientRouter.delete("/", deleteClient);
