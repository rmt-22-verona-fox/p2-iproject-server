const express = require("express");
const cors = require("cors");
const searchRoute = require("./routes/search");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/search", searchRoute);

app.listen(PORT, () => {
  console.log(`Listen on port ${PORT}`);
});
