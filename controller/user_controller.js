const { User, Profile, Partner } = require("../models");
const { tokenCreate } = require("../helper/jwt");
const { decryption } = require("../helper/encryption");

class userController {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;
      await User.create({ email, password });
      res.status(201).json({
        email: email,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw { name: "Email is required" };
      }

      if (!password) {
        throw { name: "Password is required" };
      }

      const Users = await User.findOne({
        where: {
          email,
        },
      });
      if (!Users) {
        throw { name: "Invalid email/password" };
      }

      if (!decryption(password, Users.password)) {
        throw { name: "Invalid email/password" };
      }

      const token = tokenCreate({
        id: Users.id,
        email: Users.email,
      });

      res.status(200).json({
        access_token: token,
      });
    } catch (err) {
      next(err);
    }
  }

  static async profile(req, res, next) {
    try {
      const { id } = req.user;
      const Users = await User.findByPk(id, {
        include: [Profile],
      });

      if (!Users.Profile) {
        throw { name: "Add Profile First" };
      }
      res.status(200).json(Users);
    } catch (err) {
      next(err);
    }
  }

  static async addprofile(req, res, next) {
    try {
      const { id } = req.user;
      const { name, gender, age, phoneNumber, address } = req.body;
      if (!req.file) {
        throw { name: "Photo is required" };
      }
      await Profile.create({
        name,
        gender,
        age,
        phoneNumber,
        address,
        photoProfile: req.file.originalname,
        UserId: id,
      });

      res.status(200).json({
        photo: req.file,
      });
    } catch (err) {
      next(err);
    }
  }

  static async listProfile(req, res, next) {
    try {
      let Users = "";

      const Usergender = await Profile.findOne({
        where: {
          UserId: req.user.id,
        },
      });

      if (Usergender.gender === "male") {
        Users = await Profile.findAll({
          where: {
            gender: "female",
          },
        });
      } else {
        Users = await Partner.findAll({
          where: {
            ProfileId: req.user.id,
          },
          include: [
            {
              model: User,
              include: Profile,
            },
          ],
        });
        Users = Users.map((e) => {
          return e.User.Profile;
        });
      }

      if (!Users) {
        throw { name: "Data not found" };
      }
      res.status(200).json(Users);
    } catch (err) {
      next(err);
    }
  }

  static async addPartner(req, res, next) {
    try {
      const { id } = req.user;
      const { ProfileId } = req.body;
      const find = await Partner.findOne({
        where: {
          UserId: id,
        },
      });

      if (find) {
        throw { name: "You can't add more" };
      }
      const partner = await Partner.create({
        UserId: id,
        ProfileId,
      });
      res.status(201).json(partner);
    } catch (error) {
      next(error);
    }
  }

  static async listPartner(req, res, next) {
    try {
      const partner = await Partner.findOne({
        where: {
          UserId: req.user.id,
        },
        include: [Profile],
      });
      if (!partner) {
        throw { name: "Data not found" };
      }
      res.status(200).json(partner);
    } catch (error) {
      next(error);
    }
  }

  static async recievedRequest(req, res, next) {
    try {
      const partner = await Partner.findAll({
        where: {
          UserId: req.user.id,
        },
        include: [Profile],
      });

      res.status(200).json(partner);
    } catch (error) {
      next(error);
    }
  }

  static async cencelRequest(req, res, next) {
    try {
      const { id } = req.body;
      await Partner.destroy({
        where: {
          id,
        },
      });
      res.status(201).json({
        message: "Success delete",
      });
    } catch (error) {
      next(error);
    }
  }

  static async acceptRequest(req, res, next) {
    try {
      const { id } = req.body;
      await Partner.update(
        { status: "accepted" },
        {
          where: {
            ProfileId: req.user.id,
            UserId: id,
          },
        }
      );
      res.status(201).json({
        message : 'accepted'
      })
    } catch (error) {
      console.log(error);
    }
  }


  static async partner(req, res, next) {}
}

module.exports = userController;
