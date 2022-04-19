const { Movie } = require("../models/index");

const authorize = async (req, res, next) => {
  try {
    const { id } = req.params;
    const movies = await Movie.findByPk(id);
    console.log(req.user.role);
    if (!movies) {
      throw { name: "Not Found" };
    } else if (req.user.role === "admin") {
      next();
    } else if (req.user.id === movies.authorId) {
      next();
    } else {
      throw { name: "Forbidden" };
    }
  } catch (err) {
    next(err);
  }
};

module.exports = authorize;
