const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRETKEY

function createToken(payload) {
    return jwt.sign(payload, secretKey, {
        expiresIn: "365d"
    })
}

function readPayload(token) {
    return jwt.verify(token, secretKey)
}
module.exports = {
    createToken,
    readPayload
}