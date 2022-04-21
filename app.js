if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const cron = require("node-cron");

const app = express();

const port = process.env.PORT || 3000;
const { error } = require("./middlewares/errorHandling");
const router = require("./routes/router");
const { sendBulkRandomSurah } = require("./helpers/nodemailer");

app.use(
  cors({
    origin: `*`,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(router);

cron.schedule(
  " 00 07 * * * ",
  () => {
    sendBulkRandomSurah();
    console.log("success send email");
  },
  {
    scheduled: true,
    timezone: "Asia/Jakarta",
  }
);
app.use(error);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
