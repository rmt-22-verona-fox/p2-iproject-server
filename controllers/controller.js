const customer = require("../models/customer")
const {Customer, Ticket} = require('../models')
const { verifyPassword } = require("../helpers/bcrypt")
const { tokenGenerator } = require("../helpers/jwt")

class Controller {
    static async register(req, res, next) {
        try {
            const {email, password} = req.body
            const newCustomer = await Customer.create({
                email,
                password
            })
            res.status(201).json({
                id: newCustomer.id,
                email: newCustomer.email
            })
        } catch (error) {
            next(error)
        }
    }
    static async login(req, res, next) {
        try {
            const {email, password} = req.body
            if (!email) throw {name: 'EMAIL_IS_REQUIRED'}
            if (!password) throw {name: 'PASSWORD_IS_REQUIRED'}
            const selectedCustomer = await Customer.findOne({
                where: {
                    email: email
                }
            })
            if (!selectedCustomer) throw {name: 'USER_NOT_FOUND', statusCode: 401}
            const passwordCheck = verifyPassword(password, selectedCustomer.password)
            if (!passwordCheck) throw {name: 'USER_NOT_FOUND', statusCode: 401}

            const payload = {
                id: selectedCustomer.id,
                email: selectedCustomer.email
            }
            const token = tokenGenerator(payload)
            res.status(200).json({
                access_token: token,
            })
        } catch (error) {
            next(error)
        }
    }
    static async getAllData(req, res, next) {
        try {

        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller