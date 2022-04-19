const fs = require('fs')
const getBrands = require('../db/brands')
const getSneakers = require('../db/products')

class Controller {
    static async listSneakers(req, res, next) {
        try {
            // const { data } = await getSneakers()
            const data = JSON.parse(fs.readFileSync('./db/products.json'))
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = Controller