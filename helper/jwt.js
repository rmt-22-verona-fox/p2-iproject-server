const jwt = require("jsonwebtoken");

const privatekey = process.env.SECRET;

const tokenCreate = (payload) => {
  return jwt.sign(payload, privatekey);
};

const tokenVerify = (token) => {
  return jwt.verify(token, privatekey);
};

module.exports = {
  tokenCreate,
  tokenVerify,
};
