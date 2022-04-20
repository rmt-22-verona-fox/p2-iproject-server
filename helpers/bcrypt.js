const bcrypt = require('bcryptjs');

function toHash(password){
    const hash = bcrypt.hashSync(password, 10);
    return hash
}

function toVerify(inputPas, databasePas){
    bcrypt.compareSync(inputPas, databasePas)
}

module.exports = {
    toHash,
    toVerify,
}