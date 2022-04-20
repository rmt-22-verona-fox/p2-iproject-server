"use strict";
const { User } = require("../models/index");
const { checkPassword } = require("../helpers/encryption");
const { generateToken } = require("../helpers/accessToken");
module.exports = class Controller {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;
      const newUser = await User.create({ email, password });
      res.status(201).json({
        id: newUser.id,
        email: newUser.email,
      });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw { name: "EmptyLoginData", msg: "Enter your email" };
      } else if (!password) {
        throw { name: "EmptyLoginData", msg: "Enter your password" };
      }

      const user = await User.findOne({ where: { email } });
      if (!user) throw { name: "InvalidLoginData" };

      const isValidPassword = checkPassword(password, user.password);
      if (!isValidPassword) throw { name: "InvalidLoginData" };

      const token = generateToken({ id: user.id, email: user.email });
      res.status(200).json({
        access_token: token,
        username: user.email,
      });
    } catch (err) {
      next(err);
    }
  }

  static async googleLogin(req, res, next) {
    try {
      const { token } = req.body;
      const { OAuth2Client } = require("google-auth-library");
      const client = new OAuth2Client(process.env.CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,
      });
      const payload = ticket.getPayload();

      const foundUser = await User.findOne({
        where: {
          email: payload.email,
        },
      });

      let accessToken;
      let createdUser;
      if (foundUser) {
        accessToken = generateToken({
          id: foundUser.id,
          email: foundUser.email,
        });
      } else {
        createdUser = await User.create({
          email: payload.email,
          password: "google-signin-user",
        });
        accessToken = generateToken({
          id: createdUser.id,
          email: createdUser.email,
        });
      }

      res.status(200).json({ access_token: accessToken });
    } catch (err) {
      next(err);
    }
  }
};
