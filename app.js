"use strict";
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const error = require("./middlewares/error");
const router = require("./routers/router");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(router);

app.use(error);

app.listen(port, () => console.log(`jalan cuy`));
