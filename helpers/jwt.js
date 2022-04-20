const jwt = require('jsonwebtoken')
const secretKeyword = process.env.SECRET

const tokenGenerator = (payload) => {
    return jwt.sign(payload, secretKeyword)
}

const payloadReader = (token) => {
    return jwt.verify(token, secretKeyword)
}

module.exports = {
    tokenGenerator,
    payloadReader
}