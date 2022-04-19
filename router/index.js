const express = require('express')
const router = express.Router()
const youtubeRoute = require('./youtube')

router.use('/youtube', youtubeRoute)

module.exports = router