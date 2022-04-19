const { Destination } = require("../models");

class Controller {
  static async getAllDestination(req, res, next) {
    try {
      const data = await Destination.findAll({});

      res.status(200).json({
        code: 200,
        data,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = Controller;
