const { User } = require("../models");
const { generatePayload } = require("../helpers/helperJwt");

const authenticationUser = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    const payload = generatePayload(access_token);

    const user = await User.findOne({ where: { email: payload.email } });

    if (!user) {
      throw { name: "Unauthorized", statusCode: 401 };
    } else {
      req.user = {
        id: user.id,
        email: user.email,
      };
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  authenticationUser,
};
