const express = require('express')
const patientRouter = express.Router()
const PatientController = require('../controllers/patientController');

// define the home page route
patientRouter.post('/login', PatientController.login )
patientRouter.post('/register', PatientController.register)
patientRouter.post('/request', PatientController.request)
patientRouter.get('/read', PatientController.read)

module.exports = patientRouter