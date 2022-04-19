const express = require("express");
const cors = require("cors");
const Controller = require("./Controller/controller");
const app = express();
const cron = require("node-cron");
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: `*`,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/register", Controller.register);
app.get("/bookmarks", Controller.getBookmark);
// app.delete("/bookmarks/:id", Controller.deleteBookmarks);
app.get("/surah", Controller.getSurah);
app.get("/surah/:id", Controller.detailSurah);

// cron.schedule(" * * * * * * ", () => {
//   console.log("success send email");
// });
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
