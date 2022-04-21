const { Customer } = require('../models')
const { payloadReader } = require('../helpers/jwt.js')

const authentication = async(req, res, next) => {
    try {
        const {access_token} = req.headers
        const payload = payloadReader(access_token)
        const selectedCustomer = await Customer.findByPk(payload.id)
        if (!selectedCustomer) {
            throw {name: 'Unauthorized', statusCode: 401}
        } else {
            req.user = {
                id: selectedCustomer.id,
                email: selectedCustomer.email
            }
        }
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = authentication