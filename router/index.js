const express = require('express')
const router = express.Router()
const youtubeRoute = require('./youtube')
const nbaRoute = require('./nba')

router.use('/youtube', youtubeRoute)
router.use('/nba', nbaRoute)

module.exports = router