require("dotenv").config();
const { createProxyMiddleware } = require("http-proxy-middleware");

const { config } = require("./config/connection");
const mysql = require("mysql2/promise");
const express = require("express");
const { clientRoute } = require("./routes");
const client = require("./models/clients.model");
const app = express();

app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // Allow requests from any domain
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api/v1", clientRoute);
const start = async () => {
  try {
    const data = {
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    };

    const { host, port, user, password, database } = data;
    const connection = await mysql.createConnection({
      host,
      port,
      user,
      password,
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    await app.listen(process.env.PORT);
    console.log("Serving at port" + process.env.PORT);
  } catch (error) {
    console.error(error);
  }
};

start();
