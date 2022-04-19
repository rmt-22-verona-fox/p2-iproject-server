"use strict";
module.exports = {
  errorHandler(err, req, res, next) {
    switch (err.name) {
      default:
        res.status(500).json(err);
        break;
    }
  },
};
