const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes")
const client = require("./config/db");
const cookieparser = require("cookie-parser");

const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(
  cors({
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    optionsSuccessStatus: 200,
    allowedHeaders: [
      "Access-Control-Allow-Credentials",
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Origin",
      "Access-Control-Allow-Cross-Origin",
      "Access-Control-Allow-Methods",
      "Origin",
      "WithCredentials",
      "X-Requested-Wwith",
      "Content-Type",
      "Accept",
      "Authorization",
      "X-HTTP-Method-Override",
      "Set-Cookie",
      "Cookie",
      "Request",
    ],
  })
);

app.use(express.json());
app.use("/api", router);
app.use(express.json({ limit: "10mb", extended: true }));
app.use(
  express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 })
);
app.use(cookieparser());

app.listen(process.env.PORT, () => {
  console.log("Server connected on PORT 3001");
});