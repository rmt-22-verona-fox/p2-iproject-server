const { Booking } = require("../models");
const nodemailer = require("nodemailer");

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

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "aliansyah720@gmail.com",
          pass: "beifong2pop",
        },
      });

      const mailOptions = {
        from: '"Nomads Official" <sekertariat-negara@gmail.com>',
        to: email,
        subject: "Booking Comfirm",
        text: `This your book number : ${createBooking.bookingNumber}`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
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
