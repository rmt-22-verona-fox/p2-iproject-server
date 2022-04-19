const { User, Profile_Female, Profile_Male } = require("../models");
const { tokenCreate } = require("../helper/jwt");
const encrypt = require("../helper/encryption");

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

      if (!encrypt(password, Users.password)) {
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
      const Female = await User.findByPk(req.user.id, {
        attributes: { exclude: ["createdAt", "updatedAt", "password"] },
        include: [
          {
            model: Profile_Female,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
      });

      const Male = await User.findByPk(req.user.id, {
        attributes: { exclude: ["createdAt", "updatedAt", "password"] },
        include: [
          {
            model: Profile_Male,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
      });


      if (!Female.Profile_Female || !Male.Profile_Male) {
        throw { name: "Add profile first" };
      }
      
        res.status(200).json({
          Female,
          Male,
        });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = userController;
