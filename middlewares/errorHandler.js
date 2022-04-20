module.exports = (err, req, res, next) => {
  switch (err.name) {
    case "SequelizeUniqueConstraintError":
      [errorMessage] = err.errors.map((el) => el.message);
      console.log(errorMessage, '>>>>>>>>')
      res.status(400).json({
        message: errorMessage,
      });
      break;
    case "SequelizeValidationError":
      [errorMessage] = err.errors.map((el) => el.message);
      console.log(errorMessage, '>>>>>>>>')
      res.status(400).json({
        message: errorMessage,
      });
      break;
    case "JsonWebTokenError":
      res.status(401).json({
        error: {
          message: "Invalid token",
        },
      });
      break;
    case "TokenExpiredError":
      res.status(401).json({
        error: {
          message: "Invalid token",
        },
      });
      break;
    case "Unauthorized":
      res.status(err.statusCode).json({
        error: {
          message: "User not registered",
        },
      });
      break;
    case "WRONG_EMAIL_PASSWORD":
      res.status(err.statusCode).json({
        message: "Invalid email or password",
      });
      break;
    case "Forbidden":
      res.status(err.statusCode).json({
        error: {
          message: "Failed authorization",
        },
      });
      break;
    case "PRODUCT_NOT_FOUND":
      res.status(err.statusCode).json({
        error: {
          message: "Product not found",
        },
      });
      break;
    case "EMAIL_CUSTOMER_REQUIRED":
      res.status(err.statusCode).json({
        message: "Email is required",
      });
      break;
    case "PASSWORD_CUSTOMER_REQUIRED":
      res.status(err.statusCode).json({
        message: "Password is required",
      });
      break;
    case "DUPLICATE_PRODUCT":
      res.status(err.statusCode).json({
        error: {
          message: "Product already added on wishlist"
        }
      });
      break;
    default:
      res.status(500).json({
        error: {
          message: "Internal Server Error",
        },
      });
  }
};