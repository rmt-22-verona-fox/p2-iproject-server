const { User, Profile, Partner } = require("../models");
const { tokenCreate } = require("../helper/jwt");
const { decryption } = require("../helper/encryption");

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

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw { name: "Email is required" };
      }

      if (!password) {
        throw { name: "Password is required" };
      }

      const Users = await User.findOne({
        where: {
          email,
        },
      });
      if (!Users) {
        throw { name: "Invalid email/password" };
      }

      if (!decryption(password, Users.password)) {
        throw { name: "Invalid email/password" };
      }

      const token = tokenCreate({
        id: Users.id,
        email: Users.email,
      });

      res.status(200).json({
        access_token: token,
      });
    } catch (err) {
      next(err);
    }
  }

  static async profile(req, res, next) {
    try {
      const { id } = req.user;

      const Users = await User.findByPk(id, {
        include: [Profile],
      });
      if (!Users.Profile) {
        throw { name: "Add profile first" };
      }
      res.status(200).json(Users);
    } catch (err) {
      next(err);
    }
  }

  static async addprofile(req, res, next) {
    try {
      const { id } = req.user;
      const { name, gender, age, phoneNumber, address } = req.body;

      await Profile.create({
        name,
        gender,
        age,
        phoneNumber,
        address,
        UserId: id,
      });

      res.status(200).json({
        Profile,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = userController;
