const { Booking } = require("../models");

class Controller {
  static async bookingCreate(req, res, next) {
    try {
      const {
        paymentMethod,
        child,
        adult,
        infant,
        firstName,
        lastName,
        phoneNumber,
        email,
        addressLine,
        city,
        zipCode,
        specialRequirement,
        totalPayment,
        discount,
        destinationId,
      } = req.body;

      const createBooking = await Booking.create({
        paymentMethod,
        child,
        adult,
        infant,
        firstName,
        lastName,
        phoneNumber,
        email,
        addressLine,
        city,
        zipCode,
        specialRequirement,
        totalPayment: Math.round(totalPayment),
        discount,
        destinationId,
      });

      res.status(201).json({
        code: 201,
        message: "Booking success!",
        data: {
          numberBooking: createBooking.bookingNumber,
        },
      });
    } catch (err) {
      next(err);
      console.log(err);
    }
  }

  static async getBookingByNumber(req, res, next) {
    try {
      const { number } = req.params;
      const data = await Booking.findOne({ where: { bookingNumber: number } });

      res.status(200).json({
        data,
      });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Controller;
