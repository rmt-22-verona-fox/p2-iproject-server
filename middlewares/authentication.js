"use strict";
const { getPayload } = require("../helpers/accessToken");

module.exports = {
  async authenticate(req, res, next) {
    try {
      const token = req.headers.access_token;
      if (!token) {
        throw { name: "Unauthorized" };
      } else {
        const payload = getPayload(token);
        req.user = payload;
        next();
      }
    } catch (err) {
      next(err);
    }
  }
}