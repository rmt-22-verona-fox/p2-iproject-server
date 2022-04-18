const bcrypt = require("bcryptjs")

const hashPassword = (passwrod) => {
    return bcrypt.hashSync(passwrod)
}

const comparePassword = (passwrod, hashPassword) => {
    return bcrypt.compareSync(passwrod, hashPassword)
}

module.exports = {
    hashPassword,
    comparePassword
}