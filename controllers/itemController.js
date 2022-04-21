const {
  Item,
  Category,
  User,
  Contributor,
  Transaction,
} = require('../models/index');
const { Op } = require('sequelize');

class itemController {
  static async showAllItem(req, res, next) {
    try {
      const { categoryId, price, page } = req.query;
      const { id } = req.params;
      const itemList = await Item.findAll({
        // limit: 8,
        // offset: page ? (page - 1) * 8 : 0,
        include: [Category, User],
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        // where:
        //   categoryId && price
        //     ? { categoryId: categoryId, price: { [Op.lte]: price } }
        //     : categoryId && !price
        //     ? { categoryId: categoryId }
        //     : !categoryId && price
        //     ? { price: { [Op.lte]: price } }
        //     : id
        //     ? { authorId: id }
        //     : null,
        order: [['id']],
      });
      res.status(200).json({
        statusCode: 200,
        data: itemList,
        // totalPage: Math.ceil(itemList.length / 8),
      });
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }
  static async postNewItem(req, res, next) {
    try {
      const {
        name,
        description,
        quantity,
        price,
        categoryId,
        sellerId,
        status,
      } = req.body;

      const newItem = await Item.create({
        name,
        description,
        quantity,
        price,
        sellerId,
        categoryId,
        status,
      });
      res.status(201).json({
        statusCode: 201,
        message: 'Item created succesfully',
        data: newItem,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async showItemDetail(req, res, next) {
    try {
      const { id } = req.params;
      const selectItemById = await Item.findByPk(id, { include: Category });
      if (!selectItemById) {
        throw new Error('I_NOT_found');
      }
      res.status(200).json({
        statusCode: 200,
        data: selectItemById,
      });
      // console.log(userList);
    } catch (error) {
      if (error.message === 'I_NOT_found') {
        res.status(404).json({
          statusCode: 404,
          error: {
            message: 'Item Not Found',
          },
        });
      } else {
        next(error);
      }
    }
  }
  static async deleteItemById(req, res, next) {
    //!kalo sempat entar di findByPk, ambil name menunya, baru di delete
    try {
      const itemId = +req.params.id;
      const deleteditem = await Item.destroy({
        where: {
          id: itemId,
        },
      });
      if (!deleteditem) {
        throw new Error('I_NOT_found');
      }
      res.status(200).json({
        statusCode: 200,
        message: `Item ${itemId} deleted succesfully`,
      });
      // console.log(userList);
    } catch (error) {
      if (error.message === 'I_NOT_found') {
        res.status(404).json({
          statusCode: 404,
          error: {
            message: 'Item Not Found',
          },
        });
      } else {
        next(error);
      }
    }
  }
}
module.exports = itemController;
