//npx sequelize-cli model:generate --name Patient --attributes name:string,email:string,password:string,phoneNumber:string,address:string,symptomps:string
//npx sequelize-cli model:generate --name Ailment --attributes name:string,profName:string,icd:string,icdName:string,patientId:integer
//npx sequelize-cli model:generate --name Doctor --attributes name:string,email:string,password:string,phoneNumber:string,speciality:string
//npx sequelize-cli model:generate --name DoctorPatient --attributes DoctorId:integer,PatientId:integer