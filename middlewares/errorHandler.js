module.exports = (err, req, res, next) => {
  switch (err.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      res.status(400).json({
        message: err.errors[0].message,
      });
      break;

    case "JsonWebTokenError":
      res.status(401).json({
        message: "Invalid token",
      });
      break;

    case "DataNotFound":
      res.status(404).json({
        message: "Data not found",
      });
      break;

    case "LoginValidationError":
      res.status(400).json({
        message: err.message,
      });
      break;

    case "UserNotValid":
      res.status(401).json({
        message: "Invalid email/password",
      });
      break;

    case "EmailVerificationError":
      res.status(400).json({
        message: err.message,
      });
      break;

    case "EmailNotVerified":
      res.status(403).json({
        message: err.message,
      });
      break;

    case "MongoDBConnectionError":
      res.status(500).json({
        message: err.message,
      });
      break;

    default:
      res.status(500).json({
        message: "Internal server error",
        err,
      });
      break;
  }
};
