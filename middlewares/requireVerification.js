module.exports = async (req, res, next) => {
  try {
    if (req.user.verificationStatus) {
      next();
    } else {
      throw {
        name: "EmailNotVerified",
        message: "Kamu belum melakukan verifikasi email",
      };
    }
  } catch (err) {
    next(err);
  }
};
