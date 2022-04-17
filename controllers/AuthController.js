const { User } = require("../models");
const { verifyPassword } = require("../helpers/bcrypt");
const { generateToken, verifyToken } = require("../helpers/jwt");

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

  static async login(req, res, next) {
    try {
      const userInputForm = {
        email: req.body?.email,
        password: req.body?.password,
      };

      if (!userInputForm.email) {
        throw { name: "LoginValidationError", message: "Email is required" };
      }

      if (!userInputForm.password) {
        throw { name: "LoginValidationError", message: "Password is required" };
      }

      const matchingUser = await User.findOne({
        where: {
          email: userInputForm.email,
        },
      });

      if (!matchingUser) {
        throw { name: "UserNotValid" };
      }

      const isPasswordMatch = verifyPassword(
        userInputForm.password,
        matchingUser.password
      );

      if (!isPasswordMatch) {
        throw { name: "UserNotValid" };
      }

      const token = generateToken({
        id: matchingUser.id,
        fullName: matchingUser.fullName,
        email: matchingUser.email,
      });

      res.status(200).json({
        access_token: token,
      });
    } catch (err) {
      next(err);
    }
  }

  static async verify(req, res, next) {
    try {
      const { verificationCode } = req.body;

      if (!verificationCode) {
        throw {
          name: "EmailVerificationError",
          message: "Enter a verification code",
        };
      }

      if (verificationCode.toLowerCase() === req.user.verificationCode) {
        await User.update(
          {
            isVerified: true,
          },
          {
            where: {
              email: req.user.email,
            },
          }
        );

        res.status(200).json({
          message: "Your email has been verified",
        });
      } else if (verificationCode.toLowerCase() !== req.user.verificationCode) {
        throw {
          name: "EmailVerificationError",
          message: "Your verification code is invalid",
        };
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AuthController;
