const { Package, Transaction } = require("../models");
const snap = require("../services/midtrans");

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
            model: Package,
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

  /* NEED FRONT END INTEGRATION */
  static async payment(req, res, next) {
    try {
      let parameter = {
        transaction_details: {
          order_id: "test-transaction-123",
          gross_amount: 200000,
        },
        credit_card: {
          secure: true,
        },
      };

      const transaction = await snap.createTransaction(parameter);

      let transactionToken = transaction.token;
      console.log("transactionToken:", transactionToken);

      let transactionRedirectUrl = transaction.redirect_url;

      console.log("transactionRedirectUrl:", transactionRedirectUrl);
    } catch (err) {
      console.log("Error occured:", err.message);
    }
  }
}

module.exports = TransactionController;
