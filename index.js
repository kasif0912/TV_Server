import { config } from "dotenv";
config();

import express, {urlencoded} from "express";
const app = express();
import cors from 'cors'
import connectDB from './db/connection.js'
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }))


app.get("/", (req, res) => {
  res.send("hello");
});

// routes
import userRoute from "./routes/user.route.js";
app.use("/api", userRoute);


// database connection and listen to server
connectDB()
  .then(() => app.listen(PORT, () => console.log(`server running at port ${PORT}`)))
  .catch((err) => console.log("error : ", err));
