const { User } = require('../models/index')
const { createToken } = require('../helpers/helper-jwt')
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
            const accessToken = createToken(payload)
            res.status(200).json({
                statusCode: 200,
                accessToken: accessToken,
                email: loggedInUser.email,
            })
        } catch (err) {
            next(err)
        }
    }

    // static async loginHandler (req, res, next) {
    //     try{

    //     } catch(err){

    //     }
    // }
}