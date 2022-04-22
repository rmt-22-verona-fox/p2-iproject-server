const { Customer, Event, History, Order } = require("../models");

class eventController {
  static async homePage(req, res, next) {
    try {
      const events = await Event.findAll({
        limit: 3,
        order: [["id", "DESC"]],
      });

      res.status(200).json({
        message: "Successfully get events for homepage",
        events,
      });
    } catch (error) {
      next(error);
    }
  }

  static async list(req, res, next) {
    try {
      const events = await Event.findAll();

      res.status(200).json({
        message: "Successfully get all events",
        events,
      });
    } catch (error) {
      next(error);
    }
  }

  static async patchHands(req, res, next) {
    try {
      const { CustomerId } = req.body;
      const { EventId } = req.params;

      const event = await Event.findByPk(EventId);

      if (!event) {
        throw { statusCode: 404 };
      }

      const updateHandsEvent = await event.increment("receivedHands", {
        by: 1,
      });

      const customer = await Customer.findByPk(CustomerId);

      const increaseHands = await customer.increment("hands", {
        by: -1,
      });

      if (!customer) {
        throw { statusCode: 404 };
      }

      res.status(200).json({
        message: "Successfully updated hands",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = eventController;
