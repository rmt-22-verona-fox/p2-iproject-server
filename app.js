const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const nodemailer = require('nodemailer')
const router = require('./router')

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "hcms.edgar.test@gmail.com",
        pass: "$hcmsadmin4"
    }
})

let mailOptions = {
    from: "hcms.edgar.test@gmail.com",
    to: "edgar.dimas.ir@gmail.com",
    subject: "Testing",
    text:"first email send from nodejs",
    
}

transporter.sendMail(mailOptions, (err, success) => {
    if(err){
        console.log(err)
    } else {
        console.log("Email sent successfully")
    }
})

app.use(router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})