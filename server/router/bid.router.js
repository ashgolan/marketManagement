import { Router } from "express";
import { addBid, deleteBid, getBids } from "../controllers/bid.controller.js";

export const bidsRouter = Router();

bidsRouter.post("/", addBid);
bidsRouter.get("/", getBids);
// bidRouter.get("/findBid", getClientById);
// bidRouter.patch("/", updateClient);
bidsRouter.delete("/", deleteBid);
