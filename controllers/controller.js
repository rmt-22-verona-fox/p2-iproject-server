const customer = require("../models/customer")
const {Customer, Ticket} = require('../models')
const { verifyPassword } = require("../helpers/bcrypt")
const { tokenGenerator } = require("../helpers/jwt")

class Controller {
    static async register(req, res, next) {
        try {
            const {email, password, phoneNumber, address} = req.body
            const newCustomer = await Customer.create({
                email,
                password,
                phoneNumber,
                address
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
    static async bookingHotel(req, res, next) {
        try {
            const {hotel, lat, lng, price, roomType, hotelClass, checkIn, checkOut} = req.body
            const CustomerId = +req.user.id
            const findTicket = await Ticket.findOne({
                where: {
                    CustomerId: req.user.id
                }
            })
            if (findTicket) throw {name: 'ALREADY_BOOKED'}
            const newTicket = await Ticket.create({
                hotel,
                lat: +lat,
                lng: +lng,
                price,
                roomType,
                hotelClass,
                CustomerId,
                checkIn,
                checkOut
            })
            res.status(201).json(newTicket)
        } catch (error) {
            next(error)
        }
    }
    static async getTicket(req, res, next) {
        try {
            const ticketData = await Ticket.findOne({
                where: {
                    CustomerId: req.user.id
                },
                include: [Customer]
            })
            res.status(200).json(ticketData)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller