const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET_KEY;

const generateToken = (password) => {
  return jwt.sign(password, SECRET);
};

const verifyToken = (token) => {
  return jwt.verify(token, SECRET);
};

module.exports = {
  generateToken,
  verifyToken,
};
