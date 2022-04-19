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
}

module.exports = Controller