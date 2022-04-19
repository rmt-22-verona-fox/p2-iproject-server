const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { compare, encrypt } = require("../helpers/bcrypts");
const { generateToken } = require("../helpers/jwt");

class UserController {
  static async register(req, res, next) {
    try {
      const { username, email, password, bio, imageUrl } = req.body;
      if (!email)
        throw {
          name: "Invalid email / password",
          message: "Email is required",
        };
      if (!password)
        throw {
          name: "Invalid email / password",
          message: "Password is required",
        };
      if (!username)
        throw {
          name: "Invalid email / password",
          message: "Username is required",
        };

      const userData = await prisma.user.create({
        data: {
          username,
          email,
          password: encrypt(password, 10),
          bio,
          imageUrl,
        },
      });
      res.status(201).json({
        message: "Register Success!",
        userData,
      });
    } catch (err) {
      next(err);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email)
        throw {
          name: "Invalid email / password",
          message: "Email is required",
        };
      if (!password)
        throw {
          name: "Invalid email / password",
          message: "Password is required",
        };
      const login = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (!login)
        throw {
          name: "Unauthorized",
          message: "Invalid email / password",
        };
      const comparePass = compare(password, login.password);
      if (!comparePass)
        throw {
          name: "Unauthorized",
          message: "Invalid email / password",
        };
      const payload = {
        id: login.id,
        email: login.email,
      };
      const token = generateToken(payload);
      const dataUser = {
        id_token: token,
        id: login.id,
        username: login.username,
        role: login.role,
      };
      res.status(200).json({
        message: "Login Success!",
        dataUser,
      });
    } catch (err) {
      next(err);
    }
  }
}
module.exports = UserController;
