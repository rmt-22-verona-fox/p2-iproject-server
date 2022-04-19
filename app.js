if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
require("@prisma/client");
const express = require("express");
const router = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening on port ${port} http://localhost:3000/`);
});

module.exports = app;
