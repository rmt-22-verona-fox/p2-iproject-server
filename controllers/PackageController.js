const { MongoClient } = require("mongodb");
const { User, Package } = require("../models");

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

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

  static async categories(req, res, next) {
    try {
      await client.connect();

      if (!client) {
        throw {
          name: "MongoDBConnectionError",
          message: "Mongo DB connection error",
        };
      }

      const db = client.db("travelio");

      const collection = db.collection("categories");

      const categories = await collection.find({}).toArray();

      res.status(200).json(categories);
    } catch (err) {
      next(err);
    } finally {
      client.close();
    }
  }

  static async testimonies(req, res, next) {
    try {
      await client.connect();

      if (!client) {
        throw {
          name: "MongoDBConnectionError",
          message: "Mongo DB connection error",
        };
      }

      const db = client.db("travelio");

      const collection = db.collection("testimonies");

      const testimonies = await collection.find({}).toArray();

      res.status(200).json(testimonies);
    } catch (err) {
      next(err);
    } finally {
      client.close();
    }
  }
}

module.exports = PackageController;
