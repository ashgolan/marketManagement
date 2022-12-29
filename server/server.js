import Express from "express";
import cors from "cors";
import "./DB/mongoose.js";
import { clientRouter } from "./router/client.router.js";
import { transactionRouter } from "./router/transaction.router.js";
import { getAllData } from "./controllers/allData.controller.js";
import { inventoryRouter } from "./router/inventory.router.js";
import { bidsRouter } from "./router/bid.router.js";
const app = Express();
app.use(Express.json());
app.use(cors());

app.get("/", getAllData);
app.use("/clients", clientRouter);
app.use("/transactions", transactionRouter);
app.use("/inventory", inventoryRouter);
app.use("/bids", bidsRouter);

app.listen("5000", () => {
  console.log("listining to port 5000 ...");
});
