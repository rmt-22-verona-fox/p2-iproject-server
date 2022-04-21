module.exports = function (err, req, res, next) {
  switch (err.name) {
    // case value:
    //   break;

    default:
      res.status(500).json({
        code: 500,
        message: "Internal Server Error",
      });
      break;
  }
};
