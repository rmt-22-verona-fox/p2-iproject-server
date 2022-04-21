const express = require("express");
const router = express.Router();

const routerRegister = require("./register");
const routerLogin = require("./login");
const routerJobs = require('./jobs')
const routerMyApplications = require('./myApplications')
const { authenticationUser } = require("../middlewares/authentication")

router.use("/register", routerRegister);
router.use("/login", routerLogin);
router.use(authenticationUser)
router.use('/jobs', routerJobs)
router.use('/myapplications', routerMyApplications)

module.exports = router;