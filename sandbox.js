//npx sequelize-cli model:generate --name Patient --attributes name:string,email:string,password:string,phoneNumber:string,address:string,symptomps:string
//npx sequelize-cli model:generate --name Ailment --attributes name:string,profName:string,icd:string,icdName:string,patientId:integer
//npx sequelize-cli model:generate --name Doctor --attributes name:string,email:string,password:string,phoneNumber:string,speciality:string
//npx sequelize-cli model:generate --name DoctorPatient --attributes DoctorId:integer,PatientId:integer

// let transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: "hcms.edgar.test@gmail.com",
//         pass: "$hcmsadmin4"
//     }
// })

// let mailOptions = {
//     from: "hcms.edgar.test@gmail.com",
//     to: "edgar.dimas.ir@gmail.com",
//     subject: "Testing",
//     text:"first email send from nodejs",
    
// }

// transporter.sendMail(mailOptions, (err, success) => {
//     if(err){
//         console.log(err)
//     } else {
//         console.log("Email sent successfully")
//     }
// })