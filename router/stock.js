const express = require("express")
const router = express.Router()
const Controller = require("../Controllers/stock")

// router.get("/---", Controller.stock)

// router.post("/watchList/")

router.get("/watchList", Controller.watchList)

module.exports = router 