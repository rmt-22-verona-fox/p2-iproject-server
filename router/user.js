const express = require("express");
const user = express.Router();
const userController = require("../controller/user_controller");
const authentication = require("../middleware/authentication");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
user.post("/register", userController.register);
user.post("/login", userController.login);
user.get("/profile", authentication, userController.profile);
user.post(
  "/addprofile",
  authentication,
  upload.single("file"),
  userController.addprofile
);
user.get("/listprofile", authentication, userController.listProfile);
user.post("/addpartner", authentication, userController.addPartner);

module.exports = user;
