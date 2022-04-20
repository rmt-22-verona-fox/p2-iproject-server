const { toVerify } = require("../helpers/bcrypt");
const { toToken } = require("../helpers/jwt");
const { Doctor, DoctorPatient, Patient } = require("../models");

class doctorController {
  static async login(req, res, next) {
    console.log("login controller controllers");
    try {
      const response = await Doctor.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (!response) {
        throw { name: "D_NOT_FOUND" };
      }
      const isValid = toVerify(req.body.password, response.password);

      if(!isValid){
          throw {name: "D_NOT_FOUND"}
      }

      const token = toToken()
      
    } catch (err) {
      next(err);
    }
  }

  static async getAllPatients(req, res, next) {
    console.log("get all patients controllers");
    try {
        
    } catch (err) {
      next(err);
    }
  }

  static async changeStat(req, res, next) {
    console.log("get all patients controllers");
    
    try {
    } catch (err) {
      next(err);
    }
  }
}

module.exports = doctorController