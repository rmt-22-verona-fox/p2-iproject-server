module.exports = (err, req, res, next) => {
  switch (err.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      res.status(400).json({
        message: err.errors[0].message,
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
      res.status(401).json({
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
