const jwt = require("jsonwebtoken")
const SECRET_KEY = "beli5GorenganBayarnya1"

const signIn = (payload) => {
    return jwt.sign(payload, SECRET_KEY)
}

const verifyToken = (token) => {
    return jwt.verify(token, SECRET_KEY)
}

module.exports = {
    signIn,
    verifyToken
}