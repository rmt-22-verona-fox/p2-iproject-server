const {Customer, Ticket} = require('../models')
const { verifyPassword } = require("../helpers/bcrypt")
const { tokenGenerator } = require("../helpers/jwt")
const nodemailer = require('nodemailer')
const snap = require('../helpers/midtrans')

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
            let transporter = nodemailer.createTransport({
                service: "hotmail",
                auth: {
                    user: "narutosakura15@outlook.com",
                    pass: "Narutosasuke"
                }
            });

            let mailOptions = {
                from: 'narutosakura15@outlook.com',
                to: req.user.email,
                subject: 'Test masuk nodemailer',
                text: `You have already booked ticket and this your ticket information
                Email to : ${req.user.email}
                Here is some information for you regarding the Hotel
                Hotel: ${newTicket.hotel}
                Hotel Class : ${newTicket.hotelClass}
                Price : ${newTicket.price}
                Location : latitude ${newTicket.lat} / longitude ${newTicket.lng}
                `
            };

            transporter.sendMail(mailOptions, (err, info) => {
                if (err) console.log(err);
            });

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
    static async payment(req, res, next) {
        try {
            let price = req.body.price * req.body.hotelClass
            if (!price) price = 100000
            let parameter = {
                transaction_details: {
                    order_id: Math.floor(Math.random() * 100000),
                    gross_amount: price
                }, credit_card:{
                    secure : true
                }
            };

            const transaction = await snap.createTransaction(parameter)
            res.status(201).json({
                token: transaction.token
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller