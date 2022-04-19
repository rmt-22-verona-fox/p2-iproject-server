"use strict";
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();

app.use(express.url({ extended: false }));
app.use(express.json());
app.use(cors());

module.exports = app;
