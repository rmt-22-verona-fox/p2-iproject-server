const bcrypt = require("bcryptjs");

function createHash(password) {
  return bcrypt.hashSync(password, 5);
}
function compareHash(inputPassword, userPassword) {
  return bcrypt.compareSync(inputPassword, userPassword);
}

module.exports = {
  createHash,
  compareHash,
};
