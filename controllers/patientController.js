const { user } = require("pg/lib/defaults");
const { Patient, DoctorPatient, Doctor } = require("../models");
require('dotenv').config()
const nodemailer = require('nodemailer')

class patientController {
  static async register(req, res, next) {
    console.log("register controller");
  }

  static async login(req, res, next) {
    console.log("login controller");
  }

  static async read(req, res, next){
    console.log("read controller")
    try{
        const response = await Doctor.findAll()
        res.status(200).json(response)
    }catch(err){
        next(err)
    }
  }

  static async request(req, res, next) {
    console.log("request controller");
    console.log(req.body, "<<<<< req.body request");
    try {
      const response = await Doctor.findByPk(req.body.doctorId);
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "hcms.edgar.test@gmail.com",
          pass: process.env.HCMS_PASS,
        },
      });

      let mailOptions = {
        from: "hcms.edgar.test@gmail.com",
        to: "edgar.dimas.ir@gmail.com",
        subject: "Testing",
        text: "email send from customer request",
      };

      transporter.sendMail(mailOptions, (err, success) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Email sent successfully");
        }
      });
    } catch (err) {
      next(err);
    }
  }

}

module.exports = patientController;
