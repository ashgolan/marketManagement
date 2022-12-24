import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const URL = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.lwfbntn.mongodb.net/?retryWrites=true&w=majority`;
mongoose.set("strictQuery", false);
mongoose
  .connect(URL)
  .then(() => {
    console.log("connected to mongoDB");
  })
  .catch((e) => {
    console.log("MongooDb connection Error" + e);
  });
