const express = require('express');
const patientRouter = express.Router()
const PatientController = require('../controllers/patientController');
const authentication = require('../middlewares/authentication');
// define the home page route
patientRouter.post('/login', PatientController.login )
patientRouter.post('/register', PatientController.register)
patientRouter.use(authentication)
patientRouter.get('/read', PatientController.read)
patientRouter.post('/request', PatientController.request)

module.exports = patientRouter