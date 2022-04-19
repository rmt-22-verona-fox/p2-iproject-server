const express = require("express");
const Controller = require("../Controller/controller");
const router = express.Router();
const { authentication } = require("../middlewares/authentication");

router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.get("/bookmarks", authentication, Controller.getBookmark);
// router.delete("/bookmarks/:id", Controller.deleteBookmarks);
router.get("/surah", Controller.getSurah);
router.get("/randomSurah", Controller.randomSurah);
router.get("/surah/:id", Controller.detailSurah);

module.exports = router;
