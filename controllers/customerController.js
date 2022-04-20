const { Customer, Event, History, Order } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { payloadToToken } = require("../helpers/jwt");

class customerController {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;

      const customer = await Customer.create({
        email,
        password,
      });

      const payload = { CustomerId: customer.id, email: customer.email };

      const token = payloadToToken(payload);

      res.status(201).json({
        message: "Customer registered successfully",
        access_token: token,
        CustomerId: customer.id,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const customer = await Customer.findOne({
        where: {
          email,
        },
      });

      if (!customer) {
        throw { name: "INVALID_EMAIL" };
      }

      const isMatch = comparePassword(password, customer.password);

      if (!isMatch) {
        throw { name: "INVALID_PASSWORD" };
      }

      const payload = { CustomerId: customer.id, email: customer.email };

      const token = payloadToToken(payload);

      res.status(200).json({
        statusCode: 200,
        message: "Customer logged in successfully",
        access_token: token,
        CustomerId: customer.id,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = customerController;
