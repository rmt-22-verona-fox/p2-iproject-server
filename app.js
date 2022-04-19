if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')
const getBrands = require('./db/brands')
const getSneakers = require('./db/products')
const fs = require('fs')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.post('/login', )
app.get('/brands', async(req, res, next) => {
    try {
        // const { data } = await getBrands()
        const data = JSON.parse(fs.readFileSync('./db/brands.json'))
        res.status(200).json(data)
    } catch (err) {
        console.log(err)
    }
})

app.get('/products', async(req, res, next) => {
    try {
        // const { data } = await getSneakers()
        const data = JSON.parse(fs.readFileSync('./db/products.json'))
        res.status(200).json(data)
    } catch (err) {
        console.log(err)
    }
})

// app.get('/products/:id')

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})