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
          message: "Kamu belum pernah melakukan perjalanan bersama Travel10",
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
      const { packageId, packageQty } = req.body;

      const checkoutPackage = await Transaction.create({
        UserId: req.user.id,
        PackageId: packageId,
        quantity: packageQty,
        checkoutDate: new Date(),
        paymentStatus: true,
      });

      res.status(200).json(checkoutPackage);
    } catch (err) {
      next(err);
    }
  }

  static async payment(req, res, next) {
    try {
      const { amount, fullName, email } = req.body;

      let parameter = {
        transaction_details: {
          order_id: "TRAVEL10_" + Math.floor(Math.random() * 1000000),
          gross_amount: 1,
        },
        customer_details: {
          first_name: fullName.split(" ")[0],
          last_name: fullName.split(" ")[1],
          email: email,
          phone: "+6281283071034",
        },
        enabled_payments: [
          "credit_card",
          "cimb_clicks",
          "bca_klikbca",
          "bca_klikpay",
          "bri_epay",
          "echannel",
          "permata_va",
          "bca_va",
          "bni_va",
          "bri_va",
          "other_va",
          "gopay",
          "indomaret",
          "danamon_online",
          "akulaku",
          "shopeepay",
        ],
        credit_card: {
          secure: true,
          channel: "migs",
          bank: "bca",
          installment: {
            required: false,
            terms: {
              bni: [3, 6, 12],
              mandiri: [3, 6, 12],
              cimb: [3],
              bca: [3, 6, 12],
              offline: [6, 12],
            },
          },
          whitelist_bins: ["48111111", "41111111"],
        },
      };

      const transaction = await snap.createTransaction(parameter);

      res.status(200).json({
        token: transaction.token,
        redirect_url: transaction.redirect_url,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = TransactionController;
