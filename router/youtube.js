const express = require('express')
const router = express.Router()

const youtubeController = require('../controllers/youtubeController')

router.get('/dribble', youtubeController.getDribble)

router.get('/passing', youtubeController.getPassing)

router.get('/finishing', youtubeController.getFinishing)

router.get('/shooting', youtubeController.getShooting)

router.get('footwork', youtubeController.getFootwork)

module.exports = router