const { readPayload } = require('../helpers/helper-jwt')
const { User } = require('../models/index')
const authentication = async(req, res, next) => {
    try {
        const { access_token } = req.headers
        if (access_token === 'null') {
            throw ({ name: 'Please login first' })
        }
        const payload = readPayload(access_token)
        const authenticatedUser = await User.findByPk(payload.id)
        if (!authenticatedUser) {
            throw ({ name: 'Authentication Failed' })
        } else {
            req.user = {
                id: authenticatedUser.id,
                email: authenticatedUser.email,
                role: authenticatedUser.role
            }
        }
        next()
    } catch (err) {
        next(err)
    }
}


module.exports = authentication