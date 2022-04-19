class Booking {
  static async login(req, res, next) {
    try {
      res.send("login");
    } catch (err) {
      next(err);
      console.log(err);
    }
  }

  static async register(req, res, next) {
    try {
      res.send("register");
    } catch (err) {
      next(err);
      console.log(err);
    }
  }
}

module.exports = Booking;
