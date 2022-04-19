const express = require('express')
const router = express.Router()

const nbaController = require('../controllers/nbaController')

router.post('/games', nbaController.getGames)

router.get('/seasons', nbaController.getSeasons)

router.post('/standings', nbaController.getStandings)

module.exports = router