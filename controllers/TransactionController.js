const { Package, User, Transaction } = require("../models");

class TransactionController {
  static async profile(req, res, next) {
    try {
      const transactionHistory = await Transaction.findAll({
        where: {
          UserId: req.user.id,
          paymentStatus: true,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: User,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
      });

      if (!transactionHistory.length) {
        res.status(200).json({
          message: "Kamu belum pernah melakukan perjalanan bersama Travelio",
        });
      } else {
        res.status(200).json(transactionHistory);
      }
    } catch (err) {
      next(err);
    }
  }

  static async checkout(req, res, next) {
    try {
      const { packageId } = req.query;

      const checkoutPackage = await Transaction.create({
        UserId: req.user.id,
        PackageId: packageId,
        checkoutDate: new Date(),
      });

      res.status(200).json(checkoutPackage);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = TransactionController;
