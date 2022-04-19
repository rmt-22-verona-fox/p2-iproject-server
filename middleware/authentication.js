const { tokenVerify } = require("../helper/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;

    const payload = tokenVerify(access_token);

    const findUser = await User.findByPk(payload.id);

    if (!findUser) {
      throw { name: "Invalid token" };
    } else {
      req.user = {
        id: findUser.id,
      };
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authentication;
