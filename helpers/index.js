const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = "loegueend";

const hash = (password) => {
  return bcrypt.hashSync(password, 8);
};

const compare = (password, hashPasword) => {
  return bcrypt.compareSync(password, hashPasword);
};

const createToken = (payload) => {
  return jwt.sign(payload, secretKey);
};

const readToken = (token) => {
  return jwt.verify(token, secretKey);
};

module.exports = { hash, compare, createToken, readToken };
