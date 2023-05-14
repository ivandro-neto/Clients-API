require('dotenv').config()
const { createProxyMiddleware } = require("http-proxy-middleware");


const config = require("./config/connection");
const mysql = require("mysql2/promise");
const express = require('express')
const { clientRoute } = require('./routes')
const client = require('./models/clients.model')
const app = express()

app.use(express.json())
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // Allow requests from any domain
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use('/api/v1', clientRoute)
const start = async () => {
  try {
    
    await app.listen(process.env.PORT)
    console.log('Serving at port 3000')
  } catch (error) {
    console.error(error)
  }
};

start()