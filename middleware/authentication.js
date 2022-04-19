const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
    const { access_token } = req.headers;
    try {
        const payload = verifyToken(access_token);

        const token = await User.findOne({ where: { id: payload.id } });
        if (!token) {
            throw new Error("INVALID_TOKEN");
        }

        req.user = {
            id: token.id,
            username: token.username,
            email: token.email,
        };
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = authentication;
