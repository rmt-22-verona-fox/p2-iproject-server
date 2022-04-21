const { Invoice } = require('../models/index')
class Controller {
    static async listInvoice(req, res, next) {
        try {
            const id = req.user.id
            const listInvoice = await Invoice.findAll({
                where: {
                    UserId: id
                }
            })

            res.status(200).json(listInvoice)
        } catch (err) {
            next(err)
        }
    }

    static async createInvoice(req, res, next) {
        try {
            const id = req.user.id
            const { itemName, price, size, quantity } = req.body
            console.log(itemName, price, size, quantity, id)
            const newInvoice = await Invoice.create({
                itemName: itemName,
                price: price * quantity,
                size: +size,
                quantity: quantity,
                UserId: id
            })

            res.status(201).json(newInvoice)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = Controller