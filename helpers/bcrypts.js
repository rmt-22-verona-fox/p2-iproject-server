const bcrypt = require("bcryptjs");

module.exports = {
  encrypt: (password) => {
    return bcrypt.hashSync(password, 10);
  },
  compare: (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword);
  },
};
