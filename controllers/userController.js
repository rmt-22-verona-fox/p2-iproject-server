const {
  Item,
  Category,
  User,
  Contributor,
  Transaction,
} = require('../models/index');
const { Op } = require('sequelize');
const { comparePassowrd } = require('../helpers/helperBcrypt');
const { tokenMakerFromPayload } = require('../helpers/helperJwt');

class userController {
  static async registerNewUser(req, res, next) {
    try {
      const { email, password, username, role, isSeller } = req.body;
      const newUser = await User.create({
        email,
        password,
        username,
        role,
        isSeller: false,
      });

      res.status(201).json({
        statusCode: 201,
        data: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
          role: newUser.role,
        },
        message: 'user created succesfullly',
      });
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const findUserByEmail = await User.findOne({
        where: { email },
      });
      if (!findUserByEmail) {
        throw new Error('User_NOT_VALID');
      }

      const passwordValidation = comparePassowrd(
        password,
        findUserByEmail.password
      );
      if (!passwordValidation) {
        throw new Error('User_NOT_VALID');
      }

      //!payload
      const payload = {
        id: findUserByEmail.id,
        username: findUserByEmail.username,
        email: findUserByEmail.email,
        role: findUserByEmail.role,
        isSeller: findUserByEmail.isSeller,
      };
      const accesToken = tokenMakerFromPayload(payload);
      //return data
      res.status(200).json({
        statusCode: 200,
        access_token: accesToken,
      });
    } catch (error) {
      if (error.message === 'User_NOT_VALID') {
        res.status(401).json({
          statusCode: 401,
          error: {
            message: 'Invalid email or password',
          },
        });
      } else {
        next(error);
      }
    }
  }

  static async showAllUser(req, res, next) {
    try {
      const userList = await User.findAll();

      res.status(200).json({
        statusCode: 200,
        data: userList,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = userController;
