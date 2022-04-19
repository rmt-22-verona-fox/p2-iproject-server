const { verifyToken } = require("../helpers/jwt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function authN(req, res, next) {
  try {
    const { access_token } = req.headers;
    if (!access_token)
      throw {
        name: "Invalid Token",
        message: "Please login first",
      };

    const payload = verifyToken(access_token);
    const foundUser = await prisma.user.findUnique({
      where: {
        id: payload.id,
        email: payload.email,
      },
    });
    if (!foundUser)
      throw {
        name: "Unauthorized Error",
        message: "Please login first",
      };
    req.userLogin = {
      userId: foundUser.id,
      email: foundUser.email,
      username: foundUser.username,
    };
    next();
  } catch (err) {
    next(err);
  }
}
module.exports = authN;
