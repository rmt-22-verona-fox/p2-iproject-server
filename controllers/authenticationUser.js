const { User } = require("../models");
const { comparePassword } = require('../helpers/helperBcrypt')
const { generateToken } = require('../helpers/helperJwt')

class AuthenticationUser {
  static async userRegister(req, res, next) {
    try {
      const { email, password, firstName, lastName, location } = req.body;
      const newUser = await User.create({
        email, password, firstName, lastName, location
      });

      res.status(201).json({
        id: newUser.id,
        email: newUser.email,
        fullName: `${newUser.firstName} ${newUser.lastName}`
      });
    } catch (err) {
      console.log(err)
      next(err);
    }
  }

  static async userLogin(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) {
        throw { name: 'EMAIL_USER_REQUIRED', statusCode: 400 }
      }

      if (!password) {
        throw { name: 'PASSWORD_USER_REQUIRED', statusCode: 400 }
      }

      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw { name: "WRONG_EMAIL_PASSWORD", statusCode: 401 };
      }

      const checkPassword = comparePassword(password, user.password);

      if (!checkPassword) {
        throw { name: "WRONG_EMAIL_PASSWORD", statusCode: 401 };
      }

      const payload = {
        id: user.id,
        email: user.email,
      };

      const token = generateToken(payload);

      res.status(200).json({
        access_token: token,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AuthenticationUser;