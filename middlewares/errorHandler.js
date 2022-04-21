module.exports = (err, req, res, next) => {
  switch (err.name) {
    case "SequelizeUniqueConstraintError":
      [errorMessage] = err.errors.map((el) => el.message);
      res.status(400).json({
        message: errorMessage,
      });
      break;
    case "SequelizeValidationError":
      [errorMessage] = err.errors.map((el) => el.message);
      res.status(400).json({
        message: errorMessage,
      });
      break;
    case "JsonWebTokenError":
      console.log(err);
      res.status(401).json({
        message: "Invalid token, please login again",
      });
      break;
    case "TokenExpiredError":
      console.log(err);
      res.status(401).json({
        message: "Invalid token, please login again",
      });
      break;
    case "Unauthorized":
      res.status(err.statusCode).json({
        message: "User not found",
      });
      break;
    case "WRONG_EMAIL_PASSWORD":
      res.status(err.statusCode).json({
        message: "Invalid email or password",
      });
      break;
    case "Forbidden":
      res.status(err.statusCode).json({
        message: "Failed authorization",
      });
      break;
    case "JOB_NOT_FOUND":
      res.status(404).json({
        message: "Job not found",
      });
      break;
    case "YOUR_APPLICATION_NOT_FOUND":
      res.status(err.statusCode).json({
        message: "Your application not found",
      });
      break;
    case "EMAIL_USER_REQUIRED":
      res.status(err.statusCode).json({
        message: "Email is required",
      });
      break;
    case "PASSWORD_USER_REQUIRED":
      res.status(err.statusCode).json({
        message: "Password is required",
      });
      break;
    case "DUPLICATE_APPLICATION":
      res.status(err.statusCode).json({
        message: "Application already added on MyApplications",
      });
      break;
    case "MAX_TOTAL_APPLICATION":
      res.status(err.statusCode).json({
        message:
          "You already applied 3 applications, please finish them before applied another application",
      });
      break;
    default:
      res.status(500).json({
        message: "Internal Server Error",
      });
  }
};
