const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = "loegueend";

const hashPassword = (password) => {
  return bcrypt.hashSync(password, 8);
};

const comparePassword = (password, hashPasword) => {
  return bcrypt.compareSync(password, hashPasword);
};

const createToken = (payload) => {
  return jwt.sign(payload, secretKey);
};

const readToken = (token) => {
  return jwt.verify(token, secretKey);
};

module.exports = { hashPassword, comparePassword, createToken, readToken };
