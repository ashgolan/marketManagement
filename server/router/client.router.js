import { Router } from "express";
import {
  addClient,
  getClientById,
  getClients,
} from "../controllers/client.controller.js";
export const clientRouter = Router();

clientRouter.post("/", addClient);
clientRouter.get("/", getClients);
clientRouter.get("/findClient", getClientById);
