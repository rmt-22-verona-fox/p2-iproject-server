if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
  }

const express = require('express')
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')
const router = require('./router')
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use('/', router)

app.use(errorHandler)

app.listen(port, () => {
  console.log(`This app listening on port ${port}`)
})
