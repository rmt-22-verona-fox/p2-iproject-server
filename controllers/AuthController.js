const { User } = require("../models");

class AuthController {
  static async register(req, res, next) {
    try {
      const userInputForm = {
        fullName: req.body?.fullName || null,
        email: req.body?.email || null,
        password: req.body?.password || null,
        city: req.body?.city || null,
        bio: req.body?.bio || null,
      };

      const userCreatedData = await User.create(userInputForm);

      res.status(201).json({
        id: userCreatedData.id,
        fullName: userCreatedData.fullName,
        email: userCreatedData.email,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AuthController;
