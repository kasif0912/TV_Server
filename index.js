require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./routes/router");
const { connectDB } = require("./db/connection");
const port = process.env.PORT || 4000;

const app = express();
app.use(express.json());
app.use(cors());

// routes
app.use("/api", router);
app.get("/", (req, res) => {
  res.send("hello");
});


// database connection and listen to server
connectDB()
  .then(() => app.listen(port, () => console.log("server started")))
  .catch(() => console.log("error"));
