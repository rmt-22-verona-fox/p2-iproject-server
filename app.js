if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
var cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
