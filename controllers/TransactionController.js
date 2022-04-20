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
      // res.header("Authorization", process.env.MIDTRANS_SECRET);
      let parameter = {
        transaction_details: {
          order_id: "orderid_2",
          gross_amount: 30000,
        },
      };

      // let parameter = {
      //   transaction_details: {
      //     order_id: "HALO",
      //     gross_amount: 10000,
      //   },
      //   item_details: [
      //     {
      //       id: "ITEM1",
      //       price: 10000,
      //       quantity: 1,
      //       name: "Midtrans Bear",
      //       brand: "Midtrans",
      //       category: "Toys",
      //       merchant_name: "Midtrans",
      //     },
      //   ],
      //   customer_details: {
      //     first_name: "TEST",
      //     last_name: "MIDTRANSER",
      //     email: "test@midtrans.com",
      //     phone: "+628123456",
      //     billing_address: {
      //       first_name: "TEST",
      //       last_name: "MIDTRANSER",
      //       email: "test@midtrans.com",
      //       phone: "081 2233 44-55",
      //       address: "Sudirman",
      //       city: "Jakarta",
      //       postal_code: "12190",
      //       country_code: "IDN",
      //     },
      //     shipping_address: {
      //       first_name: "TEST",
      //       last_name: "MIDTRANSER",
      //       email: "test@midtrans.com",
      //       phone: "0 8128-75 7-9338",
      //       address: "Sudirman",
      //       city: "Jakarta",
      //       postal_code: "12190",
      //       country_code: "IDN",
      //     },
      //   },
      //   enabled_payments: [
      //     "credit_card",
      //     "cimb_clicks",
      //     "bca_klikbca",
      //     "bca_klikpay",
      //     "bri_epay",
      //     "echannel",
      //     "permata_va",
      //     "bca_va",
      //     "bni_va",
      //     "bri_va",
      //     "other_va",
      //     "gopay",
      //     "indomaret",
      //     "danamon_online",
      //     "akulaku",
      //     "shopeepay",
      //   ],
      //   credit_card: {
      //     secure: true,
      //     channel: "migs",
      //     bank: "bca",
      //     installment: {
      //       required: false,
      //       terms: {
      //         bni: [3, 6, 12],
      //         mandiri: [3, 6, 12],
      //         cimb: [3],
      //         bca: [3, 6, 12],
      //         offline: [6, 12],
      //       },
      //     },
      //     whitelist_bins: ["48111111", "41111111"],
      //     dynamic_descriptor: {
      //       merchant_name: "Fuji Apple Inc",
      //       city_name: "Jakarta",
      //       country_code: "ID",
      //     },
      //   },
      //   bca_va: {
      //     va_number: "12345678911",
      //     sub_company_code: "00000",
      //     free_text: {
      //       inquiry: [
      //         {
      //           en: "text in English",
      //           id: "text in Bahasa Indonesia",
      //         },
      //       ],
      //       payment: [
      //         {
      //           en: "text in English",
      //           id: "text in Bahasa Indonesia",
      //         },
      //       ],
      //     },
      //   },
      //   bni_va: {
      //     va_number: "12345678",
      //   },
      //   bri_va: {
      //     va_number: "1234567891234",
      //   },
      //   permata_va: {
      //     va_number: "1234567890",
      //     recipient_name: "SUDARSONO",
      //   },
      //   shopeepay: {
      //     callback_url: "http://shopeepay.com",
      //   },
      //   gopay: {
      //     enable_callback: true,
      //     callback_url: "http://gopay.com",
      //   },
      //   callbacks: {
      //     finish: "https://demo.midtrans.com",
      //   },
      //   expiry: {
      //     start_time: "2025-12-13 18:11:08 +0700",
      //     unit: "minutes",
      //     duration: 1,
      //   },
      //   custom_field1: "custom field 1 content",
      //   custom_field2: "custom field 2 content",
      //   custom_field3: "custom field 3 content",
      // };

      const transaction = await snap.createTransaction(parameter);

      let transactionToken = transaction.token;
      console.log("transactionToken:", transactionToken);

      let transactionRedirectUrl = transaction.redirect_url;

      console.log("transactionRedirectUrl:", transactionRedirectUrl);
      res.status(200).json({
        token: transactionToken,
        redirect_url: transactionRedirectUrl,
      });
    } catch (err) {
      console.log("Error occured:", err.message);
    }
  }
}

module.exports = TransactionController;
