if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
var cors = require('cors')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const Controller = require('./controllers/controller')
const authentication = require('./middlewares/authentication')
const errorHandlers = require('./middlewares/errorHandlers')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.post('/register', Controller.register)
app.post('/login', Controller.login)
app.use(authentication)
app.post('/booking', Controller.bookingHotel)
app.post('/payment', Controller.payment)
app.use(errorHandlers)

app.listen(port, () => {
  console.log(`This app listening on port ${port}`)
})