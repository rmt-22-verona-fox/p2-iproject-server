"use strict";

const error = (err, req, res, next) => {
  res.send(err);
  if (err.message === `Not_Found`) {
    res.status(404).json({
      statusCode: 404,
      error: {
        message: "Food not Found",
      },
    });
  } else if (
    err.name === `JsonWebTokenError` ||
    err.name === `TokenExpiredError` ||
    err.name === `Unauthorized`
  ) {
    res.status(401).json({
      statusCode: 401,
      error: {
        message: "Please Login First",
      },
    });
  } else if (err.message === `Forbidden`) {
    res.status(403).json({
      statusCode: 403,
      error: {
        message: "You not eligible to do this",
      },
    });
  } else if (err.message === `Not_Valid`) {
    res.status(404).json({
      statusCode: 404,
      error: {
        message: "Invalid username or password",
      },
    });
  } else if (err.name === `SequelizeUniqueConstraintError`) {
    let errors = [];
    err.errors.map((x) => {
      errors.push(`${x.path} had been used`);
    });
    res.status(400).json({
      statusCode: 400,
      error: errors,
    });
  } else if (err.name === `SequelizeValidationError`) {
    let errors = [];
    err.errors.map((x) => {
      errors.push(x.message);
    });
    res.status(400).json({
      statusCode: 400,
      error: errors,
    });
  } else if (err.name === `Already`) {
    res.status(404).json({
      statusCode: 404,
      error: {
        message: "This Food Already In Your Likes",
      },
    });
  } else {
    res.status(500).json({
      statusCode: 500,
      error: {
        message: `Internal Server Error`,
      },
    });
  }
};

module.exports = error;
