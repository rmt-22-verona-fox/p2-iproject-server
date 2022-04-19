const { User } = require("../models");


class userController {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;
      await User.create({ email, password });
      res.status(201).json({
        email: email,
      });
    } catch (error) {
      next(error);
    }
  }

  
}

module.exports = userController;
