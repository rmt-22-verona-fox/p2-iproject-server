const express = require('express');
const cors = require('cors');
const errorHandler = require('./middlewares/ErrorHandler');
const app = express();
const port = process.env.PORT || 3000;
const routes = require('./routes');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

module.exports = app;
