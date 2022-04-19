const bcrypt = require("bcryptjs");

const encrypt = (password, passwordUser) => {
  return bcrypt.compareSync(password, passwordUser);
};


module.exports = encrypt;