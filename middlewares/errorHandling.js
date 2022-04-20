const error = (err, req, res, next) => {
  switch (err.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      err = err.errors.map((el) => {
        return el.message;
      });
      res.status(400).json({
        status: 400,
        error: {
          message: err,
        },
      });
      break;
    case "User Already Bookmark This Surah":
      res.status(400).json({
        error: {
          message: "User Already Bookmark This Surah",
        },
      });
      break;
    case "your login is not valid":
    case "email or password invalid":
      res.status(401).json({
        statusCode: 401,
        error: {
          message: "email or password invalid",
        },
      });
      break;
    case "JsonWebTokenError":
      res.status(401).json({
        statusCode: 401,
        error: {
          message: "Please login first",
        },
      });
      break;
    case `Surah is not found`:
      res.status(404).json({
        status: 404,
        error: {
          message: `Surah is not found`,
        },
      });
      break;
    case "Bookmark is not found":
      res.status(404).json({
        status: 404,
        error: {
          message: `Bookmark is not found`,
        },
      });
      break;
    case "Unauthorized":
      res.status(403).json({
        statusCode: 403,
        error: {
          message: "Unauthorized",
        },
      });
      break;
    default:
      res.status(500).json({
        statusCode: 500,
        error: {
          message: "Internal Server Error",
          description: err.message,
        },
      });
  }
};

module.exports = { error };
