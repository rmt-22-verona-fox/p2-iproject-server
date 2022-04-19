const express = require("express");
const cors = require("cors");
const Controller = require("./Controller/controller");
const app = express();
const cron = require("node-cron");
const port = process.env.PORT || 3000;
const { error } = require("./middlewares/errorHandling");
const router = require("./routes/router");

app.use(
  cors({
    origin: `*`,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(router);

app.use(error);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
