import { config } from "dotenv";
config();

import express, { urlencoded } from "express";
import cors from "cors";
import connectDB from "./db/connection.js";
import userRoute from "./routes/userRoute/user.routes.js";
import adminRoute from "./routes/adminRoute/admin.route.js";
import paymentRoute from './routes/payment/payment.route.js'

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));

// routes
app.get("/", (req, res) => {
  res.send("hello");
});
app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/checkout", paymentRoute)

// database connection and listen to server
connectDB()
  .then(() =>
    app.listen(PORT, () => console.log(`server running at port ${PORT}`))
  )
  .catch((err) => console.log("error : ", err));
