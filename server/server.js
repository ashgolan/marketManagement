import Express from "express";
import cors from "cors";
import { clientRouter } from "./router/client.router.js";
import { transactionRouter } from "./router/transaction.router.js";
import { getAllData } from "./controllers/allData.controller.js";
import { inventoryRouter } from "./router/inventory.router.js";
import { bidsRouter } from "./router/bid.router.js";
import { sendMail } from "./emails/account.js";
import passport from "passport";
import session from "express-session";
import { userRouter } from "./router/user.router.js";
import * as url from "url";
import path from "path";
import "./DB/mongoose.js";
const PORT = process.env.PORT || 5000;

const __dirname = url.fileURLToPath(new URL("./", import.meta.url));
const publicPath = path.join(__dirname, "build");

export const app = Express();
app.use(Express.static(publicPath));

app.use(Express.json());
app.use(cors());

app.use(
  session({
    secret: "outlittlesecret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  if (!req.session) {
    return next(new Error("Oh no")); //handle error
  }
  next(); //otherwise continue
});
app.get("/", getAllData);
app.use("/clients", clientRouter);
app.use("/transactions", transactionRouter);
app.use("/inventory", inventoryRouter);
app.use("/bids", bidsRouter);
app.use("/login", userRouter);

app.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
  });
  res.send("logging out");
});

app.post("/sendMail", (req, res) => {
  try {
    sendMail(req.body.mail, req.body.name, req.body.amount);
    if (!result) throw Error("error data !!");
    res.send("ok");
  } catch (e) {
    res.send(e.message);
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});
app.listen(PORT, () => {
  console.log("listining to port ", PORT);
});
