require("dotenv").config();
const cors = require('cors')
const express = require("express");
const { clientRoute } = require("./routes");
const app = express();

app.use(express.json());
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // Allow requests from any domain
  res.header("Access-Control-Allow-Methods", "POST, GET, PATCH, DELETE"); // Allow requests from any domain
  res.header(
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res, next) => {
  res.send("OK");
  next();
});
app.use("/api/v1", clientRoute);
const start = async () => {
  try {
    await app.listen(process.env.PORT, process.env.SERVER);
    console.log("Serving at port" + process.env.PORT);
  } catch (error) {
    console.error(error);
  }
};

start();
