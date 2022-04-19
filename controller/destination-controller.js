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

  static async getDestinationById(req, res, next) {
    try {
      const { id } = req.params;
      const data = await Destination.findByPk(id);

      if (!data) throw { name: "NOT_FOUND" };

      res.status(200).json({
        code: 200,
        data,
      });
    } catch (err) {
      next(err);
      console.log(err);
    }
  }
}

module.exports = Controller;
