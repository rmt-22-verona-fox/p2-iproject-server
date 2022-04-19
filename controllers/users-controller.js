const { User } = require('../models/index')
const { createToken } = require('../helpers/helper-jwt')
const { comparePassword } = require('../helpers/helper-password')
class Controller {
    static async loginHandler(req, res, next) {
        try {
            const { email, password } = req.body
            const loggedInUser = await User.findOne({
                where: { email: email }
            })
            if (!loggedInUser) {
                throw ({ name: 'Email/Password not valid' })
            }
            const comparingPassword = comparePassword(password, loggedInUser.password)
            if (!comparingPassword) {
                throw ({ name: 'Email/Password not valid' })
            }
            const payload = {
                id: loggedInUser.id
            }
            const access_token = createToken(payload)
            res.status(200).json({
                statusCode: 200,
                access_token: access_token,
                email: loggedInUser.email,
                name: loggedInUser.name
            })
        } catch (err) {
            next(err)
        }
    }

    static async registerHandler(req, res, next) {
        try {
            const { email, password, name, address, phoneNumber } = req.body
            const newUser = await User.create({
                email,
                password,
                name,
                address,
                phoneNumber
            })
            res.status(201).json({
                statusCode: 201,
                data: {
                    id: newUser.id,
                    email: newUser.email,
                },
                message: 'User has been created successfully'
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = Controller