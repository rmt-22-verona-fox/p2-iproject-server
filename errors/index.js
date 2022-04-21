module.exports = function (err, req, res, next) {
  switch (err.name) {
    default:
      res.status(500).json({
        code: 500,
        message: "Internal Server Error",
      });
      break;
  }
};
