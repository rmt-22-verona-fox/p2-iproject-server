const { User, Package } = require("../models");

class PackageController {
  static async index(req, res, next) {
    try {
      const packages = await Package.findAll({
        where: {
          isPromo: false,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });

      res.status(200).json(packages);
    } catch (err) {
      next(err);
    }
  }

  static async promo(req, res, next) {
    try {
      const packages = await Package.findAll({
        where: {
          isPromo: true,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });

      res.status(200).json(packages);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = PackageController;
