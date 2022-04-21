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
const midtransClient = require('midtrans-client');
// Create Snap API instance
let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: 'SB-Mid-server-wbLcGSE8HpMB_os5vYzbrJgT',
  clientKey: 'SB-Mid-client-PWi2oSB5f0ZMGyhH',
});
// const { OAuth2Client } = require('google-auth-library');

class Controller {
  static async showAllCategories(req, res, next) {
    try {
      const categoryList = await Category.findAll();

      res.status(200).json({
        statusCode: 200,
        data: categoryList,
      });
    } catch (error) {
      next(error);
    }
  }

  static async addCategories(req, res, next) {
    try {
      const { name } = req.body;

      const newCategory = await Category.create({
        name,
      });
      res.status(201).json({
        statusCode: 201,
        message: 'Category created succesfully',
        data: newCategory,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateFoodPerRow(req, res, next) {
    try {
      const foodId = +req.params.id;
      const { name, description, price, imgUrl, authorId, categoryId } =
        req.body;
      let newInfo = { name, description, price, imgUrl, authorId, categoryId };
      const updated = await Food.update(newInfo, {
        where: {
          id: foodId,
        },
      });
      if (updated[0] === 0) {
        throw new Error('F_NOT_found');
      } else {
        const addToHistory = await History.create({
          entityId: foodId,
          name: 'Put',
          description: `Food with id ${foodId} updated`,
          updatedBy: req.loginfo.username,
        });
        res.status(200).json({
          statusCode: 200,
          data: newInfo,
        });
      }

      // console.log(userList);
    } catch (error) {
      if (error.message === 'F_NOT_found') {
        res.status(404).json({
          statusCode: 404,
          error: {
            message: 'Food Not Found',
          },
        });
      } else {
        next(error);
      }
    }
  }

  static async authGoogle(req, res, next) {
    try {
      const { idToken } = req.body;
      const client = new OAuth2Client(process.env.CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken,
        audiance: process.env.CLIENT_ID,
      });

      const payload = ticket.getPayload();
      // console.log(payload);

      const findUser = await User.findOne({
        where: {
          email: payload.email,
        },
      });
      let accesToken;
      let usernameName;
      let roleRole;
      let emailEmail;
      if (findUser) {
        accesToken = tokenMakerFromPayload({
          id: findUser.id,
          username: findUser.username,
          email: findUser.email,
          role: findUser.role,
          phone: findUser.phone,
          address: findUser.address,
        });
        usernameName = findUser.username;
        roleRole = findUser.role;
        emailEmail = findUser.email;
      } else {
        let number = 1;
        const newUser = await User.create({
          email: payload.email,
          password: `googlelogin${number}`,
          role: 'staff',
          phone: '08123456789',
          address: 'Jl. Kebon Jeruk',
          username: payload.name,
        });
        number++;
        usernameName = payload.name;
        roleRole = 'staff';
        emailEmail = payload.email;
        accesToken = tokenMakerFromPayload(newUser);
      }

      // console.log(usernameName, roleRole, emailEmail);
      res.status(200).json({
        statusCode: 200,
        access_token: accesToken,
        username: usernameName,
        role: roleRole,
        email: emailEmail,
      });
    } catch (error) {
      next(error);
    }
  }

  static async patchStatus(req, res, next) {
    try {
      const foodId = +req.params.id;
      const newStatus = req.body.status;
      const findFood = await Food.findByPk(foodId);
      if (!findFood) {
        throw new Error('F_NOT_found');
      }
      // console.log(findFood);
      const statusUpdate = await Food.update(
        { status: newStatus },
        {
          where: {
            id: foodId,
          },
        }
      );
      // console.log(statusUpdate);
      const addToHistory = await History.create({
        entityId: +foodId,
        name: 'Patch',
        description: `entity with id ${foodId} status has been updated from ${findFood.status} to ${newStatus}`,
        updatedBy: req.loginfo.username,
      });
      // console.log(addToHistory);
      res.status(200).json({
        statusCode: 200,
        message: 'status updated',
      });
    } catch (error) {
      if (error.message === 'F_NOT_found') {
        res.status(404).json({
          statusCode: 404,
          error: {
            message: 'Food Not Found',
          },
        });
      } else {
        next(error);
      }
    }
  }

  static async showAllHistory(req, res, next) {
    try {
      const historyList = await History.findAll();

      res.status(200).json({
        statusCode: 200,
        data: historyList,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async showUserFavorite(req, res, next) {
    try {
      const { categoryId, price } = req.body;
      const { userId } = req.params;
      const { page, limit } = req.query;
      // console.log(req.params.userId);
      // console.log(req.query);
      const FavoriteList = await Favorite.findAndCountAll({
        limit: limit ? limit : 8,
        offset: page ? (page - 1) * limit : 0,
        attributes: ['id'],
        where: { userId: userId },
        include: [
          {
            model: Food,
            where:
              categoryId && price
                ? { categoryId: categoryId, price: { [Op.lte]: price } }
                : categoryId && !price
                ? { categoryId: categoryId }
                : !categoryId && price
                ? { price: { [Op.lte]: price } }
                : null,
          },
        ],
        order: [['id']],
      });
      res.status(200).json({
        statusCode: 200,
        data: FavoriteList,
      });
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }

  static async addFavorite(req, res, next) {
    try {
      const { userId } = req.params;
      const { foodId } = req.body;
      const findUser = await User.findOne({
        where: { id: userId },
      });
      if (!findUser) {
        throw new Error('User_NOT_FOUND');
      }
      const findFood = await Food.findOne({
        where: { id: foodId },
      });
      if (!findFood) {
        throw new Error('Food_NOT_FOUND');
      }
      const findFavorite = await Favorite.findOne({
        where: { userId: userId, foodId: foodId },
      });
      if (findFavorite) {
        throw new Error('Favorite_EXIST');
      }
      const newFavorite = await Favorite.create({
        userId: userId,
        foodId: foodId,
      });
      res.status(201).json({
        statusCode: 201,
        data: newFavorite,
        message: 'Favorite added',
      });
    } catch (error) {
      if (error.message === 'Food_NOT_FOUND') {
        res.status(404).json({
          statusCode: 404,
          error: {
            message: 'Food Not Found',
          },
        });
      } else if (error.message === 'User_NOT_FOUND') {
        res.status(404).json({
          statusCode: 404,
          error: {
            message: 'User Not Found',
          },
        });
      } else if (error.message === 'Favorite_EXIST') {
        res.status(409).json({
          statusCode: 409,
          error: {
            message: 'You already add this food to favorite',
          },
        });
      } else {
        next(error);
      }
    }
  }

  static async transaction(req, res, next) {
    try {
      let parameter = {
        transaction_details: {
          order_id: 'ssaasd',
          gross_amount: 30000,
        },
      };

      const transaction = await snap.createTransaction(parameter);

      let transactionToken = transaction.token;
      console.log('transactionToken:', transactionToken);

      let transactionRedirectUrl = transaction.redirect_url;

      console.log('transactionRedirectUrl:', transactionRedirectUrl);
      res.status(200).json({
        token: transactionToken,
        redirect_url: transactionRedirectUrl,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = Controller;
