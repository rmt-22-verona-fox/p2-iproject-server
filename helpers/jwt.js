const jwt = require('jsonwebtoken')
const secretKeyword = 'SECRETWORD'

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