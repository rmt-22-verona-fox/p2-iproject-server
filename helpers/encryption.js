"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  generateHash(password) {
    return bcrypt.hashSync(password, 8);
  },
  checkPassword(password, hash) {
    return bcrypt.compareSync(password, hash);
  },
};
