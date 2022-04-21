const { comparePassword, createToken } = require("../helpers");
const { User } = require("../models");

class Controller {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) throw { name: "BAD_REQUEST_EMAIL" };
      if (!password) throw { name: "BAD_REQUEST_PASSWORD" };

      const findUser = await User.findOne({ where: { email } });
      if (!findUser) throw { name: "UNAUTHORIZE" };

      const compare = comparePassword(password, findUser.password);
      if (!compare) throw { name: "UNAUTHORIZE" };

      const payload = {
        id: findUser.id,
        email: findUser.id,
      };

      const token = createToken(payload);

      res.status(200).json({
        access_token: token,
        firstName: findUser.firstName,
      });
    } catch (err) {
      next(err);
      console.log(err);
    }
  }

  static async register(req, res, next) {
    try {
      const { firstName, lastName, phoneNumber, password, email } = req.body;

      await User.create({
        firstName,
        lastName,
        phoneNumber,
        password,
        email,
      });

      res.status(201).json({
        code: 201,
        message: "User created",
      });
    } catch (err) {
      next(err);
      console.log(err);
    }
  }
}

module.exports = Controller;
