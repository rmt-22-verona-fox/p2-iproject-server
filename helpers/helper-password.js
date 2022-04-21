const bcrypt = require('bcryptjs')

function hashingPassword(password){
    let salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

function comparePassword(password, hashedPassword){
    return bcrypt.compareSync(password, hashedPassword)
}

module.exports = {
    hashingPassword,
    comparePassword
}