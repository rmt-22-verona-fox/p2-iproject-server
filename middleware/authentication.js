const { tokenVerify } = require("../helper/jwt");
const { User, Profile } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    const payloads = tokenVerify(access_token);
    const findUser = await User.findByPk(payloads.id, {
      include: [Profile],
    });

    if (!findUser) {
      throw { name: "Invalid token" };
    } else {
      req.user = {
        id: findUser.id,
        gender: findUser.Profile.gender,
      };
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authentication;
