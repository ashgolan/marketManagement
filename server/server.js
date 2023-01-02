import Express from "express";
import cors from "cors";
import "./DB/mongoose.js";
import { clientRouter } from "./router/client.router.js";
import { transactionRouter } from "./router/transaction.router.js";
import { getAllData } from "./controllers/allData.controller.js";
import { inventoryRouter } from "./router/inventory.router.js";
import { bidsRouter } from "./router/bid.router.js";
import { sendMail } from "./emails/account.js";
const app = Express();
app.use(Express.json());
app.use(cors());

app.get("/", getAllData);
app.use("/clients", clientRouter);
app.use("/transactions", transactionRouter);
app.use("/inventory", inventoryRouter);
app.use("/bids", bidsRouter);
app.post("/sendMail", (req, res) => {
  try {
    const result = sendMail(req.body.mail, req.body.name, req.body.amount);
    if (!result) throw Error("error data !!");
    res.send("ok");
  } catch (e) {
    res.send(e.message);
  }
});

app.listen("5000", () => {
  console.log("listining to port 5000 ...");
});
