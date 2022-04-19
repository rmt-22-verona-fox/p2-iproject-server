const { Post } = require("../models");

async function AuthZ(req, res, next) {
  try {
    const { id } = req.params;
    const { userId, email } = req.userLogin;

    if (role !== "Admin") {
      const findAuthorPost = await Post.findUnique({
        where: {
          id,
          userId,
        },
      });
      if (!findAuthorPost) {
        throw {
          name: "Forbidden",
          message: "You dont have permission to access",
        };
      }
    }
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = AuthZ;
