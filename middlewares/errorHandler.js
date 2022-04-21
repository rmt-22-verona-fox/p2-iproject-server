"use strict";
module.exports = {
  errorHandler(err, req, res, next) {
    switch (err.name) {
      case "SequelizeValidationError":
      case "SequelizeUniqueConstraintError":
        res.status(400).json({ message: err.errors[0].message });
        break;
      case "EmptyLoginData":
        res.status(400).json({ message: err.msg });
        break;
      case "InvalidLoginData":
        res.status(401).json({ message: "Invalid email/password" });
        break;
      case "Unauthorized":
      case "JsonWebTokenError":
      case "TokenExpiredError":
        res.status(401).json({ message: "Invalid token" });
        break;
      case "NotFound":
        res.status(404).json({ message: "Data not found" });
        break;
      case "Forbidden":
        res.status(403).json({ message: "You are not authorized" });
        break;
      default:
        res.status(500).json({ message: "Internal server error" });
        break;
    }
  },
};
