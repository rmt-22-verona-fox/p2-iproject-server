const cors = require('cors');
const express = require('express');
const app = express()
const port = 3000
const router = require("./router")

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(router)

app.use((error, req, res, next) => {
    next()
})

app.listen(port, () => {
    console.log(`listen to port ${port}`)
})