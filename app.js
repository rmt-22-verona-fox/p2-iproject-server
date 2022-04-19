if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const router = require("./router/index");
const error = require("./middleware/errorHandler");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);
app.use(error);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
