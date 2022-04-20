const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret_key = process.env.SECRET;
function toToken(user_id) {
  const decode = jwt.sign(
    {
      id: user_id,
    },
    secret_key,
    { expiresIn: "1h" }
  );
  return decode
}

function verifyToken(token) {
  const decoded = jwt.verify(token, "shhhhh");
  return decoded
}

module.exports = {
    toToken,
    verifyToken
}