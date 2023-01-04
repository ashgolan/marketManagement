import "./server/DB/mongoose.js";
import { app } from "./server/server.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("listining to port ", PORT);
});
