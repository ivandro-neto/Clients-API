require("dotenv").config();
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");
const express = require("express");
const { clientRoute } = require("./routes");
const app = express();

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

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
