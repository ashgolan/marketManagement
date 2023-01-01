import { Router } from "express";
import {
  addBid,
  deleteBid,
  getBids,
  updateBid,
} from "../controllers/bid.controller.js";

export const bidsRouter = Router();

bidsRouter.post("/", addBid);
bidsRouter.get("/", getBids);
// bidRouter.get("/findBid", getClientById);
bidsRouter.patch("/", updateBid);
bidsRouter.delete("/", deleteBid);
