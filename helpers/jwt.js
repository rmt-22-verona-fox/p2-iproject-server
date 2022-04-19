const jwt = require("jsonwebtoken");
const secretKey = "karina";

function getToken(payload) {
  return jwt.sign(payload, secretKey);
}
// let newtoken = getToken({ id: 1 });
function verifyToken(token) {
  return jwt.verify(token, secretKey);
}

module.exports = { getToken, verifyToken };
