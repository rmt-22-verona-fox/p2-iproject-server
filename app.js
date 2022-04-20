const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const patientRouter = require('./routers/patientRouter')
const doctorRouter = require('./routers/doctorRouter')
var cors = require('cors')
app.use(cors())
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/patient', patientRouter)
app.use('/doctor', doctorRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})