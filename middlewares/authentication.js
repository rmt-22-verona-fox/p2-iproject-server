const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models/index");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;

    const payload = verifyToken(access_token);
    req.user = {
      id: payload.id,
    };

    const user = await User.findByPk(payload.id);

    if (!user) {
      throw { name: "your login is not valid" };
    }
    next();
  } catch (err) {
    next(err);
  }
};
module.exports = { authentication };
