"use strict";
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const router = require("./routes/index");
const { errorHandler } = require("./middlewares/errorHandler");

app.use(express.url({ extended: false }));
app.use(express.json());
app.use(cors());

app.use(router);

app.use(errorHandler);

module.exports = app;
