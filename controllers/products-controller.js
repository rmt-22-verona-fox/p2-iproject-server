const fs = require('fs')
const getBrands = require('../db/brands')
const getSneakers = require('../db/products')

class Controller {
    static async listSneakers(req, res, next) {
        try {
            const { page, query } = req.query
            let options = {
                method: 'GET',
                url: 'https://the-sneaker-database.p.rapidapi.com/search',
                params: { limit: '10' },
                headers: {
                    'X-RapidAPI-Host': 'the-sneaker-database.p.rapidapi.com',
                    'X-RapidAPI-Key': process.env.X_RapidAPI_Key
                }
            }
            if (page) {
                options.params.page = page
            }
            if (query) {
                options.params.query = query
            }
            console.log(options)
            const { data } = await getSneakers(options)
            console.log(data.results)
            res.status(200).json(data.results)

            // const data = JSON.parse(fs.readFileSync('./db/products.json'))
            // res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }

    static async sneakersDetail(req, res, next) {
        try {
            const id = req.params.id
            let options = {
                    method: 'GET',
                    url: `https://the-sneaker-database.p.rapidapi.com/sneakers/${id}`,
                    headers: {
                        'X-RapidAPI-Host': 'the-sneaker-database.p.rapidapi.com',
                        'X-RapidAPI-Key': process.env.X_RapidAPI_Key
                    }
                }
                // console.log(options)
            const { data } = await getSneakers(options)
                // console.log(data.results)
            res.status(200).json(data.results)
                // const data = JSON.parse(fs.readFileSync('./db/products.json'))
                // let dataDetail = ''
                // data.forEach(el => {
                //     if (el.id === id) {
                //         dataDetail = el
                //     }
                // })
                // res.status(200).json(dataDetail)
        } catch (err) {
            next(err)
        }
    }

    static async listBrands(req, res, next) {
        try {
            const { data } = await getBrands()
            res.status(200).json(data.results)
                // const data = JSON.parse(fs.readFileSync('./db/brands.json'))
                // res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = Controller