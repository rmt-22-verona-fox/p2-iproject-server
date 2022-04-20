const { User } = require("../models");

class AuthenticationUser {
  static async userRegister(req, res, next) {
    try {
      const { email, password } = req.body;
      const newUser = await User.create({
        email, password
      });

      res.status(201).json({
        id: newUser.id,
        email: newUser.email,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AuthenticationUser;