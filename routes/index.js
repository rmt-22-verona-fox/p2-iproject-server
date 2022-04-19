const router = require("express").Router();
const postRoutes = require("./postRoutes.js");
const threadRoutes = require("./threadRoutes.js");
const UserController = require("../controllers/userController");
const ThreadController = require("../controllers/threadController");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/", ThreadController.getThread);

router.use("/threads", threadRoutes);
router.use("/posts", postRoutes);

module.exports = router;
